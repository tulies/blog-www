// const moment = require('moment')
const mysql = require('../lib/mysql')
// const configs = require('../config')

const register = async ({ nickname, username, password }) => {
  const result = await mysql('sso_user').insert({
    uid: new Date().getTime(),
    nickname,
    username,
    password
  })
  return result
}

const queryUser = async ({ username }) => {
  const result = await mysql('sso_user').first(['uid', 'nickname', 'username', 'password']).where('username', username)
  return result
}

module.exports = {
  register,
  queryUser
}
