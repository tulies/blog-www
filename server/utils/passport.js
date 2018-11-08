const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const userDAO = require('../dao/user')

passport.use(new LocalStrategy(async function (username, password, done) {
  // 查询用户是否存在
  const result = await userDAO.queryUser({ username })
  if (result != null) {
    if (result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户不存在')
  }
}))

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  return done(null, user)
})

module.exports = passport
