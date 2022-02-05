/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
  prefix: '/stc',
})
// xxx.com/weapp/demo
const controllers = require('../controllers')

// --- 用户相关接口 --- //
router.get('/avatar/:uid', controllers.user.queryAvatar)

module.exports = router
