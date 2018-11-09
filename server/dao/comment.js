const moment = require('moment')
const mysql = require('../lib/mysql')
// const configs = require('../config')

// 新增主题
const addCommentTopic = async ({ tid, title, url, type }) => {
  const result = await mysql('comment_topic').returning(['id', 'title', 'url', 'type', 'create_time']).insert({
    tid,
    title,
    url,
    type
  })
  return result
}

// 添加评论
const addReplied = async ({ tid, content, grade, checkStatus, userid, username, relateUserid, relateUsername, parentid, rootid }) => {
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
    rootid: rootid || 0
  })
  return result
}

// 获取评论列表
const getReplieds = async ({ tid, userid, parentid, rootid, page, size, sortProp, sortOrder }) => {
  page = page || 0
  size = size || 10
  const whereBuilder = (builder) => {
    if (tid) {
      builder.where('tid', tid)
    }
    if (userid) {
      builder.where('userid', userid)
    }
    if (parentid) {
      builder.where('parentid', parentid)
    }
    if (rootid) {
      builder.where('rootid', rootid)
    }
  }
  var model = mysql('comment_replied').where(whereBuilder)
  const totalCount = await model.clone().count('id as count')
  const list = await model.clone()
    .limit(size)
    .offset(page * size)
    .orderBy(sortProp || 'id', sortOrder === 'ascending' ? 'asc' : 'desc')
    .map(row => ({
      ...row,
      update_time: moment(row.update_time).format('YYYY-MM-DD HH:mm:ss'),
      create_time: moment(row.create_time).format('YYYY-MM-DD HH:mm:ss')
    }))
  return {
    total: totalCount[0]['count'],
    page,
    size,
    list
  }
}
module.exports = {
  addCommentTopic,
  addReplied,
  getReplieds
}
