const Passport = require('../utils/passport')
const userDAO = require('../dao/user')

const register = async (ctx) => {
  const { nickname, username, password } = ctx.request.body
  const result = await userDAO.register({ nickname, username, password })
  ctx.body = {
    code: 0,
    msg: '注册成功',
    data: result
  }
}

// 登录
const login = async (ctx, next) => {
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
      username: user.username
    })
  })(ctx, next)
}

// 查询用户信息
const queryUserInfo = async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { uid, nickname, username } = ctx.session.passport.user
    ctx.body = {
      code: 0,
      data: {
        uid,
        nickname,
        username
      }
    }
  } else {
    ctx.body = {
      code: 0,
      data: {
        uid: 0,
        nickname: '',
        username: ''

      }
    }
  }
}

module.exports = {
  register,
  login,
  queryUserInfo
}
