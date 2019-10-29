
const wxDAO = require('../dao/wx')
const jssdkConfig = async (ctx, next) => {
  // const wxticket = await wxDAO.getticket()
  const { url } = ctx.request.query
  const jssdkConfig = await wxDAO.jssdkConfig({ url })
  ctx.body = {
    code: 0,
    data: jssdkConfig
  }
}
module.exports = {
  jssdkConfig
}
