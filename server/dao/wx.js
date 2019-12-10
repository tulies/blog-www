const axios = require('axios')
const Redis = require('koa-redis')
const redis = new Redis().client
const configs = require('../config')
const CryptoJS = require('crypto-js')

const gettoken = async () => {
  // 先从redis中获取
  const rediskey = 'blogwww:wxtoken'
  const wxtoken = await redis.get(rediskey)
  if (wxtoken) {
    // return wxtoken
  }
  const res = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${configs.wx.appId}&secret=${configs.wx.appSecret}`)
  // console.log(res)
  if (res.status !== 200 || res.data.errcode) {
    return ''
  }
  console.log(res.data)
  // 设置token到redis中
  redis.set(rediskey, res.data.access_token)
  redis.expire(rediskey, res.data.expires_in - 60)
  // redis.expire(rediskey, 10
  return res.data.access_token
}

const getticket = async () => {
  // 先从redis中获取
  const rediskey = 'blogwww:wxticket'
  const wxticket = await redis.get(rediskey)
  if (wxticket) {
    // return wxticket
  }
  const wxtoken = await gettoken()
  const res = await axios.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${wxtoken}&type=jsapi`)
  if (res.status !== 200 || res.data.errcode !== 0) {
    return ''
  }
  console.log(res.data)

  // 设置token到redis中
  redis.set(rediskey, res.data.ticket)
  redis.expire(rediskey, res.data.expires_in - 60)
  return res.data.ticket
}

const createNonceStr = (length = 16) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let str = ''
  for (let i = 0; i < length; i++) {
    str += chars.substr(Math.round(Math.random() * (chars.length - 1)), 1)
  }
  return str
}

const jssdkConfig = async ({ url }) => {
  url = decodeURIComponent(url)
  const wxticket = await getticket()
  const timestamp = Math.floor(new Date().getTime() / 1000)
  const nonceStr = createNonceStr()

  // 这里参数的顺序要按照 key 值 ASCII 码升序排序
  const rawString = `jsapi_ticket=${wxticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
  // console.log(rawString)
  const signature = CryptoJS.SHA1(rawString).toString()
  return {
    appId: configs.wx.appId,
    nonceStr,
    timestamp,
    url,
    signature,
    rawString
  }
}

const authorize = ({ backurl, redirectUri, scope, state }) => {
  // const signature = CryptoJS.SHA1(rawString).toString()
  const rediskey = CryptoJS.MD5(state).toString()
  redis.set(rediskey, state)
  redis.expire(rediskey, 60)
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${configs.wx.appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${rediskey}#wechat_redirect`
}
const authorizeCallback = async ({ code }) => {
  const res = await axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${configs.wx.appId}&secret=${configs.wx.appSecret}&code=${code}&grant_type=authorization_code`)
  if (res.status !== 200) {
    return null
  }
  return res.data
}
const snsuserinfo = async ({ accessToken, openid }) => {
  const res = await axios.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openid}&lang=zh_CN`)
  console.log(res)
  if (res.status !== 200) {
    return null
  }
  return res.data
}

const wxuserinfo = async ({ accessToken, openid }) => {
  const res = await axios.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openid}&lang=zh_CN`)
  console.log(res)
  if (res.status !== 200) {
    return null
  }
  return res.data
}

module.exports = {
  jssdkConfig,
  authorize,
  authorizeCallback,
  snsuserinfo,
  wxuserinfo
}
