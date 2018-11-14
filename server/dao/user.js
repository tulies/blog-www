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

const queryUser = async ({ username }) => {
  const result = await mysql('sso_user').first(['uid', 'nickname', 'username', 'password', 'salt']).where('username', username)
  return result
}

module.exports = {
  register,
  queryUser
}
