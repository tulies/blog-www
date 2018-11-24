// const moment = require('moment')
const mysql = require('../lib/mysql')
// const configs = require('../config')
const CryptoJS = require('crypto-js')
const register = async ({ nickname, username, password }) => {
  const salt = CryptoJS.MD5(new Date().getTime()).toString()
  const pwd = CryptoJS.MD5(CryptoJS.MD5(password).toString() + salt).toString()
  console.log({
    uid: new Date().getTime(),
    nickname,
    username,
    password: pwd,
    salt
  })
  const result = await mysql('sso_user').insert({
    uid: new Date().getTime(),
    nickname,
    username,
    password: pwd,
    salt
  })
  return result
}

// 根据uid或者username获取用户信息
const queryUser = async ({ uid, username }) => {
  let result
  if (uid) {
    result = await mysql('sso_user').first(['uid', 'nickname', 'username', 'password', 'salt']).where('uid', uid)
  } else if (username) {
    result = await mysql('sso_user').first(['uid', 'nickname', 'username', 'password', 'salt']).where('username', username)
  }
  return result
}

module.exports = {
  register,
  queryUser
}
