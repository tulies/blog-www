/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
  prefix: '/api',
})

// xxx.com/weapp/demo
const controllers = require('../controllers')
// --- 文章相关接口 --- //
// GET  查询文章list

router.get('/article/list', controllers.article.getArticleList)
// GET  根据tag查询文章list
router.get('/article/listByTag', controllers.article.getArticleByTag)
router.get('/article/listByTags', controllers.article.getArticleByTags)
// GET  文章详情
router.get('/article/info/:id', controllers.article.getArticle)
// GET  查询热门文章 --- 根据浏览次数来判断的
router.get('/article/hot', controllers.article.hot)
// GET  查询热门文章 --- 根据浏览次数来判断的
router.get('/article/new', controllers.article.new)

// GET  查询单个分类节点的信息
router.get('/article/category/:id', controllers.article.getCategory)
// GET  查询直接子分类节点的信息
router.get('/article/categoryChild/:id', controllers.article.getCategoryChild)
// GET  查询分类信息，连带查询父节点信息
router.get('/article/categoryUp/:id', controllers.article.getCategoryUp)
// GET  查询分类信息，连带查询子节点信息 -- 以树状形式显示
router.get('/article/categoryTree/:id', controllers.article.getCategoryTree)
// GET  查询当前分类下的所有叶子子节点信息 -- 只返回叶子节点
router.get('/article/categoryLeaf/:id', controllers.article.getCategoryLeaf)

// --- 用户相关接口 --- //
router.post('/user/register', controllers.user.register)
router.post('/user/login', controllers.user.login)
router.get('/user/queryUserInfo', controllers.user.queryUserInfo)
router.get('/user/avatar/:uid', controllers.user.queryAvatar)
router.post('/user/verify', controllers.user.verify)
router.get('/user/exit', controllers.user.exit)

// --- 评论相关接口 --- //
router.post('/comment/initTopic', controllers.comment.initTopic)
router.post('/comment/addRootReplied', controllers.comment.addRootReplied)
router.post('/comment/addChildReplied', controllers.comment.addChildReplied)
router.get('/comment/getReplieds', controllers.comment.getReplieds)
router.get('/comment/getChildReplieds', controllers.comment.getChildReplieds)
router.get('/comment/support/:repliedId', controllers.comment.support)
router.get('/comment/unsupport/:repliedId', controllers.comment.unsupport)

// --- 微信相关接口 --- //
router.get('/wx/jsapi-config', controllers.wx.jssdkConfig)
router.get('/wx/authorize', controllers.wx.authorize)
router.get('/wx/authorize-callback', controllers.wx.authorizeCallback)
router.get('/wx/userinfo', controllers.wx.userinfo)

module.exports = router
