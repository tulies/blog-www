const NODE_ENV = process.env.NODE_ENV || 'development'
const configs =
  NODE_ENV === 'development'
    ? require('./dev.config')
    : require('./prod.config')
module.exports = configs
