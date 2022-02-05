const Redis = require('koa-redis')
const wxDAO = require('../dao/wx')
const redis = new Redis().client

const jssdkConfig = async (ctx, next) => {
  // const wxticket = await wxDAO.getticket()
  const { url } = ctx.request.query
  const jssdkConfig = await wxDAO.jssdkConfig({ url })
  ctx.body = {
    code: 0,
    data: jssdkConfig,
  }
}

// 重定向
const authorize = (ctx, next) => {
  // const wxticket = await wxDAO.getticket()
  const {
    origin,
    query: { backurl },
  } = ctx.request
  const redirectUri = encodeURIComponent(`${origin}/api/wx/authorize-callback`)
  // const scope = 'snsapi_base'
  const scope = 'snsapi_userinfo'
  const state = backurl
  const url = wxDAO.authorize({
    redirectUri,
    scope,
    state,
  })
  ctx.response.redirect(url)
  // ctx.body = {
  //   code: 0,
  //   data: url
  // }
}

const authorizeCallback = async (ctx, next) => {
  const { code, state } = ctx.query
  const res = await wxDAO.authorizeCallback({
    code,
  })

  const snsuserinfo = await wxDAO.snsuserinfo({
    openid: res.openid,
    accessToken: res.access_token,
  })

  ctx.session.wxUserinfo = snsuserinfo
  // console.log(ctx.session.wxUserinfo)

  // 根据redis获取backurl。
  const backurl = await redis.get(state)
  // console.log(backurl)
  ctx.response.redirect(backurl)

  // ctx.body = {
  //   code: 0,
  //   data: backurl
  // }
}

// 获取微信信息
const userinfo = (ctx, next) => {
  const wxUserinfo = ctx.session.wxUserinfo
  if (!wxUserinfo) {
    // console.log({
    //   code: -1,
    //   msg: '无微信授权的登录信息',
    // })
    ctx.body = {
      code: -1,
      msg: '无微信授权的登录信息',
    }
    return
  }
  // console.log(ctx.session.wxUserinfo)
  ctx.body = {
    code: 0,
    msg: 'ok',
    data: ctx.session.wxUserinfo,
  }
}

module.exports = {
  jssdkConfig,
  authorize,
  authorizeCallback,
  userinfo,
}
