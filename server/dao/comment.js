const moment = require('moment')

const mysql = require('../lib/mysql')

// const configs = require('../config')

// 查询主题
const getCommentTopic = async ({ tid }) => {
  const result = await mysql('comment_topic').first().where({ tid })

  return result
}

// 新增主题
const addCommentTopic = async ({ tid, title, url, type }) => {
  const result = await mysql('comment_topic')
    .returning(['id', 'title', 'url', 'type', 'replied_count', 'create_time'])
    .insert({
      tid,
      title,
      url,
      type,
    })
  return result
}
// 增加评论数
const incrementRepliedCount = async ({ tid }) => {
  const result = await mysql('comment_topic')
    .where('tid', tid)
    .increment('replied_count', 1)
  return result
}
// 添加评论
const addReplied = async ({
  tid,
  content,
  grade,
  checkStatus,
  userid,
  username,
  relateUserid,
  relateUsername,
  parentid,
  rootid,
}) => {
  const result = await mysql('comment_replied').insert({
    tid,
    content,
    grade: grade || 0,
    check_status: checkStatus || 0,
    userid,
    username,
    relate_userid: relateUserid,
    relate_username: relateUsername,
    parentid: parentid || 0,
    rootid: rootid || 0,
    status: 1,
  })
  return result
}
// 查询单个replied详情
const getReplied = async ({ id }) => {
  let repied = await mysql('comment_replied').first().where({ id })
  if (repied) {
    repied = {
      ...repied,
      update_time: moment(repied.update_time).format('YYYY-MM-DD HH:mm:ss'),
      create_time: moment(repied.create_time).format('YYYY-MM-DD HH:mm:ss'),
    }
  }
  return repied
}
// 获取评论列表
const getReplieds = async ({
  tid,
  userid,
  parentid,
  rootid,
  page,
  size,
  sortProp,
  sortOrder,
}) => {
  page = page || 0
  size = size || 10
  page = Number(page)
  size = Number(size)
  const whereBuilder = (builder) => {
    builder.where('status', 1)
    if (tid) {
      builder.where('tid', tid)
    }
    if (userid) {
      builder.where('userid', userid)
    }
    if (parentid || parentid === 0) {
      builder.where('parentid', parentid)
    }
    if (rootid || rootid === 0) {
      builder.where('rootid', rootid)
    }
  }
  const model = mysql('comment_replied').where(whereBuilder)
  const totalCount = await model.clone().count('id as count')

  sortProp = sortProp || 'id'
  const sp = sortProp.split(',')
  const so = sortOrder.split(',')
  if (sp.length > 0) {
    sp.forEach((p, index) => {
      model.orderBy(p, so[index] === 'asc' ? 'asc' : 'desc')
    })
  } else {
    model.orderBy(sortProp || 'id', sortOrder === 'asc' ? 'asc' : 'desc')
  }
  const list = await model
    .clone()
    .limit(size)
    .offset(page * size)
    // .orderBy('support_count', 'desc')
    // .orderBy(sortProp || 'id', sortOrder === 'ascending' ? 'asc' : 'desc')
    .map((row) => ({
      ...row,
      update_time: moment(row.update_time).format('YYYY-MM-DD HH:mm:ss'),
      create_time: moment(row.create_time).format('YYYY-MM-DD HH:mm:ss'),
    }))
  return {
    total: totalCount[0].count,
    page,
    size,
    list,
  }
}
// 评论点赞 -- 暂时只能支持不能取消
const incrementSupport = async ({ id }) => {
  const result = await mysql('comment_replied')
    .where('id', id)
    .increment('support_count', 1)
  return result
}
// 评论不点赞 -- 暂时只能支持不能取消
const decrementSupport = async ({ id }) => {
  const result = await mysql('comment_replied')
    .where('id', id)
    .decrement('support_count', 1)
  return result
}

const addSupportRecord = async ({ tid, repliedId, uid }) => {
  const result = await mysql('comment_support').insert({
    tid,
    replied_id: repliedId,
    uid,
  })
  return result
}
const updateSupportRecord = async ({ repliedId, uid, isValid }) => {
  const result = await mysql('comment_support')
    .where({ replied_id: repliedId, uid })
    .update({
      is_valid: isValid,
    })
  return result
}

const getSupportRecord = async ({ repliedId, uid }) => {
  const result = await mysql('comment_support')
    .first()
    .where({ replied_id: repliedId, uid })
  return result
}

// 查询我是否点赞过。
const queryMySupport = async ({ uid, ids }) => {
  const result = await mysql('comment_support')
    .where({ uid, is_valid: 0 })
    .whereIn('replied_id', ids)
  return result
}

module.exports = {
  addCommentTopic,
  getCommentTopic,
  addReplied,
  getReplieds,
  getReplied,
  incrementSupport,
  decrementSupport,
  addSupportRecord,
  updateSupportRecord,
  getSupportRecord,
  queryMySupport,
  incrementRepliedCount,
}
