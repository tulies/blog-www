const CONF = {
  // serverHost: 'localhost',
  // port: '5757',
  // rootPathname: '',
  // create database cAuth
  mysql: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    db: 'myapps',
    pass: 'qpzm@WO849302tgb',
    char: 'utf8'
  },
  hosts: {
    fileUrlHost: 'http://stc.wangjiayang.cn/blog'
    // fileUrlHost: 'http://127.0.0.1/upload/tulies/blog'
  },
  author: {
    uid: '1000000001'
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  smtp: {
    host: 'smtp.qq.com',
    user: '346461062@qq.com',
    pass: 'kisnbkorppawcbef'
  },
  wx: {
    appId: 'wxa096d32094e784ce',
    appSecret: '69ffa17cb1c3cc130ef1b8dea702ee22'
  }

}
// module.exports = CONF
// export default CONF
module.exports = CONF
