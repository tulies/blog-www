// import knex from 'knex'
// import configs from '../../config'
const knex = require('knex')
const configs = require('../../config')

module.exports = knex({
  debug: 'true',
  client: 'mysql',
  connection: {
    host: configs.mysql.host,
    port: configs.mysql.port,
    user: configs.mysql.user,
    password: configs.mysql.pass,
    database: configs.mysql.db,
    charset: configs.mysql.char
  }
})
