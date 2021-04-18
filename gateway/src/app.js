const express = require('express')
const { isRelease } = require('./env')
const {
  requestForwardMiddleware,
  staticFileMiddleware
} = require('./middleware')
const app = express()

app.use(staticFileMiddleware)
app.use(requestForwardMiddleware)
app.use('/api', require('./router'))
app.use(staticFileMiddleware)
const slsInitialize = require('./slsInitialize')

if (isRelease) {
  app.slsInitialize = slsInitialize
} else {
  slsInitialize()
}

module.exports = app
