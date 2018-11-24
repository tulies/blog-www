// const moment = require('moment')
const mysql = require('../lib/mysql')
// const configs = require('../config')
const CryptoJS = require('crypto-js')
const configs = require('../config')

const register = async ({ nickname, username, password, avatar }) => {
  const salt = CryptoJS.MD5(new Date().getTime().toString()).toString()
  const pwd = CryptoJS.MD5(CryptoJS.MD5(password).toString() + salt).toString()
  const result = await mysql('sso_user').insert({
    uid: new Date().getTime(),
    nickname,
    username,
    password: pwd,
    salt,
    avatar
  })
  return result
}

// 根据uid或者username获取用户信息
const queryUser = async ({ uid, username }) => {
  let result
  if (uid) {
    result = await mysql('sso_user').first(['uid', 'nickname', 'username', 'password', 'salt', 'avatar']).where('uid', uid)
  } else if (username) {
    result = await mysql('sso_user').first(['uid', 'nickname', 'username', 'password', 'salt', 'avatar']).where('username', username)
  }
  if (result) {
    result = {
      ...result,
      avatar: configs.hosts.fileUrlHost + result.avatar
    }
  }
  return result
}

module.exports = {
  register,
  queryUser
}
