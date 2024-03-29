const commentDAO = require('../dao/comment')
const configs = require('../config/index')

const initTopic = async (ctx) => {
  const { tid, title, url, type } = ctx.request.body
  // 查询下当前主题是否存在，如果存在则不要再继续下去了
  const topic = await commentDAO.getCommentTopic({ tid })
  if (topic) {
    ctx.body = {
      code: 0,
      msg: '初始化评论主题成功',
      data: topic,
    }
    return
  }
  const result = await commentDAO.addCommentTopic({ tid, title, url, type })
  ctx.body = {
    code: 0,
    msg: '初始化评论主题成功',
    data: result,
  }
}

const addRootReplied = async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '未登录',
    }
    return false
  }
  const { uid: userid, nickname: username } = ctx.session.passport.user
  const { tid, content } = ctx.request.body
  const result = await commentDAO.addReplied({ tid, content, userid, username })
  const newid = result[0]
  let reply = await commentDAO.getReplied({ id: newid })

  if (!reply) {
    ctx.body = { code: -1, msg: '发表评论失败' }
    return
  }

  // 执行以下 评论数加1
  await commentDAO.incrementRepliedCount({ tid })
  reply = {
    ...reply,
    is_support: 0,
    is_author: reply.userid === configs.author.uid,
  }
  ctx.body = {
    code: 0,
    msg: '发表评论成功',
    data: reply,
  }
}
const addChildReplied = async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 998,
      msg: '未登录',
    }
    return false
  }
  const { uid: userid, nickname: username } = ctx.session.passport.user
  const { content, parentid } = ctx.request.body

  // 先查询下评论详情
  const replied = await commentDAO.getReplied({ id: parentid })
  if (!replied) {
    ctx.body = {
      code: -1,
      msg: '回复的评论id不存在',
    }
    return false
  }
  const {
    id,
    tid,
    grade,
    userid: relateUserid,
    username: relateUsername,
    rootid,
  } = replied

  let rootid2 = rootid
  if (rootid2 === 0) {
    rootid2 = id
  }
  const result = await commentDAO.addReplied({
    tid,
    content,
    grade: grade + 1,
    userid,
    username,
    relateUserid,
    relateUsername,
    parentid,
    rootid: rootid2,
  })

  const newid = result[0]
  let reply = await commentDAO.getReplied({ id: newid })

  if (!reply) {
    ctx.body = { code: -1, msg: '发表评论失败' }
    return
  }
  // 执行以下 评论数加1
  await commentDAO.incrementRepliedCount({ tid })

  reply = {
    ...reply,
    is_support: 0,
    is_author: reply.userid === configs.author.uid,
  }
  ctx.body = {
    code: 0,
    msg: '发表评论成功',
    data: reply,
  }
}
const getReplieds = async (ctx) => {
  // 查询文章下的评论
  const { tid, page, size, sort } = ctx.request.query

  let sortProp = 'support_count,id'
  let sortOrder = 'desc,desc'
  if (sort === 'default') {
    sortProp = 'support_count,id'
    sortOrder = 'desc,desc'
  } else if (sort === 'create') {
    sortProp = 'id'
    sortOrder = 'desc'
  }
  // 先查询出主评论
  const result = await commentDAO.getReplieds({
    tid,
    page,
    size,
    sortProp,
    sortOrder,
    parentid: 0,
  })
  let islogin = false
  let uid = 0
  if (ctx.isAuthenticated()) {
    islogin = true
    uid = ctx.session.passport.user.uid
    // uid = '1541605134550'
  }

  /** **  实在是没有时间，我直接拷贝了。。。。这边应该要代码提取的。。。。 */
  // 然后再遍历出子评论
  if (result.total > 0 && result.list.length > 0) {
    // 先统一赋值成未👍
    result.list = result.list.map((v) => ({
      ...v,
      is_support: false,
      is_author: v.userid === configs.author.uid,
    }))
    // 如果是登录用户
    if (islogin) {
      // 再根据ids查询下是否点赞过。
      const ids = result.list.map((v) => v.id)
      const suplist = await commentDAO.queryMySupport({ uid, ids })
      if (suplist && suplist.length > 0) {
        const supids = suplist.map((v) => v.replied_id)
        result.list = result.list.map((v) => ({
          ...v,
          is_support: supids.includes(v.id),
        }))
      }
    }

    for (let i = 0; i < result.list.length; i++) {
      const childs = await commentDAO.getReplieds({
        tid,
        page: 0,
        size: 5,
        sortProp: 'id',
        sortOrder: 'asc',
        rootid: result.list[i].id,
      })
      if (childs.total > 0 && childs.list.length > 0) {
        // 先统一赋值成未👍
        childs.list = childs.list.map((v) => ({
          ...v,
          is_support: false,
          is_author: v.userid === configs.author.uid,
        }))
        // 如果是登录用户
        if (islogin) {
          // 再根据ids查询下是否点赞过。
          const ids = childs.list.map((v) => v.id)
          const suplist = await commentDAO.queryMySupport({ uid, ids })
          if (suplist && suplist.length > 0) {
            const supids = suplist.map((v) => v.replied_id)
            childs.list = childs.list.map((v) => ({
              ...v,
              is_support: supids.includes(v.id),
            }))
          }
        }
      }
      result.list[i].replyList = childs
    }
    // result.list = await result.list.map(async (v) => {
    //   const childs = await commentDAO.getReplieds({ tid, page: 0, size: 2, sortProp, sortOrder, rootid: v.id })
    //   v.replyList = childs
    //   return v
    // })
  } else {
    // 查询下 这个文章的主题是否存在。 如果不存在返回一下code
    const commentTopic = await commentDAO.getCommentTopic({ tid })
    if (!commentTopic) {
      ctx.body = {
        code: 401,
        msg: '当前评论主题暂未创建过',
      }
      return
    }
  }
  ctx.body = {
    code: 0,
    msg: '查询评论列表成功',
    data: result,
  }
}
const getChildReplieds = async (ctx) => {
  // 查询文章下的评论
  const { tid, page, rootid, size } = ctx.request.query
  // let sortProp = 'support_count,id'
  // let sortOrder = 'desc,desc'
  // if (sort === 'default') {
  //   sortProp = 'support_count,id'
  //   sortOrder = 'desc,desc'
  // } else if (sort === 'created') {
  //   sortProp = 'id'
  //   sortOrder = 'desc'
  // }
  const sortProp = 'id'
  const sortOrder = 'asc'
  const result = await commentDAO.getReplieds({
    tid,
    page,
    size,
    sortProp,
    sortOrder,
    rootid,
  })
  let islogin = false
  let uid = 0
  if (ctx.isAuthenticated()) {
    islogin = true
    uid = ctx.session.passport.user.uid
    // uid = '1541605134550'
  }

  /** **  实在是没有时间，我直接拷贝了。。。。这边应该要代码提取的。。。。 */
  // 然后再遍历出子评论
  if (result.total > 0 && result.list.length > 0) {
    // 先统一赋值成未👍
    result.list = result.list.map((v) => ({
      ...v,
      is_support: false,
      is_author: v.userid === configs.author.uid,
    }))
    // 如果是登录用户
    if (islogin) {
      // 再根据ids查询下是否点赞过。
      const ids = result.list.map((v) => v.id)
      const suplist = await commentDAO.queryMySupport({ uid, ids })
      if (suplist && suplist.length > 0) {
        const supids = suplist.map((v) => v.replied_id)
        result.list = result.list.map((v) => ({
          ...v,
          is_support: supids.includes(v.id),
        }))
      }
    }
  }
  ctx.body = {
    code: 0,
    msg: '查询评论列表成功',
    data: result,
  }
}
const support = async (ctx) => {
  const { repliedId } = ctx.params

  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '未登录',
    }
    return false
  }
  const { uid } = ctx.session.passport.user
  // const uid = '1541605134550'
  // 先查询下 replied记录
  const replied = await commentDAO.getReplied({ id: repliedId })
  if (!replied) {
    ctx.body = { code: -1, msg: '系统异常' }
    return false
  }
  const { tid } = replied

  // 先查询下 记录是否存在。
  const supportRecord = await commentDAO.getSupportRecord({ repliedId, uid })
  // 如果记录存在
  if (supportRecord && supportRecord.is_valid === 0) {
    ctx.body = {
      code: 1,
      msg: '您重复点赞了',
    }
    return false
  }
  // 给文章增加一次
  const result = await commentDAO.incrementSupport({ id: repliedId })
  if (!result) {
    ctx.body = { code: -1, msg: '系统异常' }
    return false
  }
  // 如果有支持记录
  if (supportRecord) {
    await commentDAO.updateSupportRecord({ repliedId, uid, isValid: 0 })
  } else {
    await commentDAO.addSupportRecord({ tid, repliedId, uid })
  }
  ctx.body = {
    code: 0,
    msg: '支持成功',
  }
}
const unsupport = async (ctx) => {
  const { repliedId } = ctx.params

  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '未登录',
    }
    return false
  }
  const { uid } = ctx.session.passport.user
  // const uid = '1541605134550'
  // 先查询下 replied记录
  const replied = await commentDAO.getReplied({ id: repliedId })
  if (!replied) {
    ctx.body = { code: -1, msg: '系统异常' }
    return false
  }
  // const { tid } = replied

  // 先查询下 记录是否存在。
  const supportRecord = await commentDAO.getSupportRecord({ repliedId, uid })
  // 如果记录存在
  if (!(supportRecord && supportRecord.is_valid === 0)) {
    ctx.body = { code: 1, msg: '您没有赞过他啊' }
    return false
  }

  // 给文章赞减少一次
  const result = await commentDAO.decrementSupport({ id: repliedId })
  if (!result) {
    ctx.body = { code: -1, msg: '系统异常' }
    return false
  }

  // 如果有支持记录，那么就把
  // if (supportRecord) {
  //   await commentDAO.updateSupportRecord({ repliedId, uid, isValid: 0 })
  // } else {
  //   await commentDAO.addSupportRecord({ tid, repliedId, uid })
  // }
  // 肯定又记录的，只需要把可用状态改成不可用就可以了。
  await commentDAO.updateSupportRecord({ repliedId, uid, isValid: 1 })

  ctx.body = {
    code: 0,
    msg: '取消点赞成功',
  }
}

module.exports = {
  initTopic,
  getReplieds,
  getChildReplieds,
  addRootReplied,
  addChildReplied,
  support,
  unsupport,
}
