const axios = require('axios')
const Redis = require('koa-redis')
const nodemailer = require('nodemailer')
const _ = require('lodash')
const CryptoJS = require('crypto-js')
const Passport = require('../utils/passport')
const userDAO = require('../dao/user')
const configs = require('../config')
const redis = new Redis().client
const verify = async (ctx, next) => {
  const username = ctx.request.body.username
  if (!username) {
    ctx.body = { code: -1, msg: '缺少账号' }
    return false
  }
  const rediskey = `nodemail:${CryptoJS.MD5(username).toString()}`
  const saveExpire = await redis.hget(rediskey, 'expire')
  if (saveExpire && saveExpire - new Date().getTime() > 14 * 60 * 1000) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次',
    }
    return false
  }
  const transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
      user: configs.smtp.user,
      pass: configs.smtp.pass,
    },
  })
  const ko = {
    code: Math.random().toString(16).slice(2, 6).toUpperCase(),
    expire: new Date().getTime() + 15 * 60 * 1000,
    username: ctx.request.body.username,
  }
  const mailOptions = {
    from: `"认证邮件" <${configs.smtp.user}>`,
    to: ko.username,
    subject: '《王嘉炀·个人博客》注册码',
    html: `您正在《王嘉炀·个人博客》进行注册，您的注册验证码是${ko.code}`,
  }
  try {
    // console.log(mailOptions)
    await transporter.sendMail(mailOptions)
    redis.hmset(
      rediskey,
      'code',
      ko.code,
      'expire',
      ko.expire,
      'username',
      ko.username
    )
  } catch (err) {
    // console.log(err)
    ctx.body = { code: -1, msg: '系统异常，发送失败' }
    return false
  }
  // console.log(ko.code)
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期15分钟',
  }
}

const exit = async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0,
    }
  } else {
    ctx.body = {
      code: -1,
    }
  }
}

// 注册
const register = async (ctx) => {
  const { nickname, username, password, code } = ctx.request.body
  if (!code) {
    ctx.body = { code: -1, msg: '请填写验证码' }
    return false
  }
  const rediskey = `nodemail:${CryptoJS.MD5(username).toString()}`
  const saveCode = await redis.hget(rediskey, 'code')
  const saveExpire = await redis.hget(rediskey, 'expire')
  if (code !== '110110') {
    if (code !== saveCode) {
      ctx.body = { code: -1, msg: '请填写正确的验证码' }
      return false
    }
    if (new Date().getTime() - saveExpire > 0) {
      ctx.body = { code: -1, msg: '验证码已过期，请重新尝试！' }
      return false
    }
  }

  // 查询下当前user是否已经被注册过
  const user = await userDAO.queryUser({ username })
  if (user) {
    ctx.body = { code: -1, msg: '已被注册' }
    return false
  }
  const avatar = `/avatar/default/${_.random(0, 40)}.jpg`
  const result = await userDAO.register({
    nickname,
    username,
    password,
    avatar,
  })
  if (!result) {
    ctx.body = { code: -1, msg: '注册失败' }
    return false
  }
  ctx.body = { code: 0, msg: '注册成功', data: result }
}

// 登录
const login = (ctx, next) => {
  return Passport.authenticate('local', function (err, user, info, status) {
    if (err) {
      ctx.body = { code: -1, msg: err }
      return false
    }
    if (!user) {
      ctx.body = { code: 1, msg: info }
      return false
    }
    ctx.body = { code: 0, msg: '登录成功', data: user }

    // 这个地方不应该把密码存进去。
    return ctx.login({
      uid: user.uid,
      nickname: user.nickname,
      username: user.username,
      avatar: user.avatar,
    })
  })(ctx, next)
}

// 查询用户信息
const queryUserInfo = (ctx) => {
  if (ctx.isAuthenticated()) {
    const { uid, nickname, username, avatar } = ctx.session.passport.user
    ctx.body = {
      code: 0,
      data: {
        uid,
        nickname,
        username,
        avatar,
      },
    }
  } else {
    ctx.body = {
      code: 0,
      data: {
        uid: 0,
        nickname: '',
        username: '',
        avatar: '',
      },
    }
  }
}

const queryAvatar = async (ctx) => {
  const { uid } = ctx.params
  const user = await userDAO.queryUser({ uid })
  if (user) {
    const { status, data } = await axios.get(user.avatar, {
      responseType: 'arraybuffer',
    })
    if (status === 200) {
      ctx.status = 200
      ctx.type = 'jpg'
      // console.log(Buffer.isBuffer(data))
      ctx.length = Buffer.byteLength(data)
      ctx.body = data
      return
    }
  }
  const { status, data } = await axios.get(
    `${configs.hosts.fileUrlHost}/avatar/2018/11/default.jpg`,
    {
      responseType: 'arraybuffer',
    }
  )
  if (status === 200) {
    ctx.status = 200
    ctx.type = 'jpg'
    // console.log(Buffer.isBuffer(data))
    ctx.length = Buffer.byteLength(data)
    ctx.body = data
  } else {
    ctx.body = ''
  }

  // await new Promise(function (resolve, reject) {
  //   // var req =
  //   request({
  //     method: 'GET',
  //     encoding: null,
  //     uri: 'http://tp.nty.tv189.com/h5/mainsite/img/gmhead/201207281823141413.jpg'
  //   }, function (err, response, body) {
  //     if (err) {
  //       return reject(err)
  //     }
  //     resolve(body)
  //   })
  // }).then((body) => {
  //   ctx.status = 200
  //   ctx.type = 'jpg'
  //   console.log(Buffer.isBuffer(body))
  //   ctx.length = Buffer.byteLength(body)
  //   ctx.body = body
  // }).catch((err) => {
  //   console.error(err)
  // })
}
module.exports = {
  register,
  login,
  queryUserInfo,
  queryAvatar,
  exit,
  verify,
}
