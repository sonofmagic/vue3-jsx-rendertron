const express = require('express')
const history = require('connect-history-api-fallback')
const { isProd } = require('../env')
const historyMiddleware = history({
  disableDotRule: true,
  verbose: !isProd
})

const staticFileMiddleware = express.static('wwwroot')
const requestForwardMiddleware = (req, res, next) => {
  if (/^\/api/.test(req.path)) {
    next()
  } else {
    historyMiddleware(req, res, next)
  }
}

module.exports = {
  staticFileMiddleware,
  requestForwardMiddleware
}
