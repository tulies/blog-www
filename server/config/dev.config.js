const CONF = {
  // serverHost: 'localhost',
  // port: '5757',
  // rootPathname: '',
  // create database cAuth
  mysql: {
    host: '1.15.57.174',
    port: 3306,
    user: 'root',
    db: 'myapps',
    pass: 'qpzm@WO849302tgb',
    char: 'utf8mb4',
  },
  hosts: {
    fileUrlHost: 'http://127.0.0.1/upload/tulies/blog',
  },
  author: {
    uid: '1000000001',
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
  smtp: {
    host: 'smtp.qq.com',
    user: '346461062@qq.com',
    pass: '您的密码',
  },
  wx: {
    appId: 'xxx',
    appSecret: 'xxx',
  },
}
// module.exports = CONF
// export default CONF
module.exports = CONF
