const express = require('express')
const { isRelease } = require('./env')
const {
  rendererMiddleware,
  requestForwardMiddleware,
  staticFileMiddleware
} = require('./middleware')
const app = express()
app.use(rendererMiddleware)
// header X-Requested-With : XMLHttpRequest 用来绕过 staticFileMiddleware
app.use(staticFileMiddleware)
app.use(requestForwardMiddleware)
app.use('/api', require('./router'))
app.use(staticFileMiddleware)
const slsInitialize = require('./slsInitialize')

// https://github.com/serverless-components/tencent-express/blob/master/src/_shims/handler.js#L23
if (isRelease) {
  app.slsInitialize = slsInitialize
} else {
  slsInitialize()
}

module.exports = app
