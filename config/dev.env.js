'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"https://www.fastmock.site/mock/1f3a07523606cd78e586a1780f46c328"' //本地接口请求前缀
})
