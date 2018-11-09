const commentDAO = require('../dao/comment')

const initTopic = async (ctx) => {
  const { tid, title, url, type } = ctx.request.body
  console.log(ctx.request.body)
  const result = await commentDAO.addCommentTopic({ tid, title, url, type })
  ctx.body = {
    code: 0,
    msg: '初始化评论主题成功',
    data: result
  }
}
const addReplied = async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '未登录'
    }
    return false
  }
  const { uid: userid, username } = ctx.session.passport.user
  const { tid, content, grade, relateUserid, relateUsername, parentid, rootid } = ctx.request.body
  const result = await commentDAO.addReplied({ tid, content, grade, userid, username, relateUserid, relateUsername, parentid, rootid })

  ctx.body = {
    code: 0,
    msg: '发表评论成功',
    data: result
  }
}
const getReplieds = async (ctx) => {
  // 查询文章下的评论
  const { tid, page, size, sortProp, sortOrder } = ctx.request.query

  // 先查询出主评论
  const result = await commentDAO.getReplieds({ tid, page, size, sortProp, sortOrder, parentid: 0 })

  // 然后再遍历出子评论
  if (result.total > 0 && result.list.length > 0) {
    for (let i = 0; i < result.list.length; i++) {
      const childs = await commentDAO.getReplieds({ tid, page: 0, size: 2, sortProp, sortOrder, rootid: result.list[i].id })
      result.list[i].replyList = childs
    }
    // result.list = await result.list.map(async (v) => {
    //   const childs = await commentDAO.getReplieds({ tid, page: 0, size: 2, sortProp, sortOrder, rootid: v.id })
    //   v.replyList = childs
    //   return v
    // })
  }
  ctx.body = {
    code: 0,
    msg: '查询评论列表成功',
    data: result
  }
}

const getReplieds2 = async (ctx) => { //eslint-disable-line
  const { tid, userid, parentid, rootid, page, size, sortProp, sortOrder } = ctx.request.query
  console.log(ctx.request.body)
  const result = await commentDAO.getReplieds({ tid, userid, parentid, rootid, page, size, sortProp, sortOrder })
  ctx.body = {
    code: 0,
    msg: '查询评论列表成功',
    data: result
  }
}

module.exports = {
  initTopic,
  addReplied,
  getReplieds
}
