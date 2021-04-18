/**
 * @typedef {import('express').RequestHandler} RequestHandler
 */
const express = require('express')
const history = require('connect-history-api-fallback')
const isbot = require('isbot')
const rendererMoudle = require('../renderer')
const { isProd } = require('../env')
const historyMiddleware = history({
  disableDotRule: true,
  verbose: !isProd
})

/**
 * @type {RequestHandler}
 */
const rendererMiddleware = async (req, res, next) => {
  const botFlag = isbot(req.get('user-agent'))
  if (botFlag) {
    const fullURL = req.protocol + '://' + req.get('host') + req.originalUrl
    console.log(fullURL)
    const result = await rendererMoudle.renderer.serialize(fullURL, true)
    res.send(result.content)
  } else {
    next()
  }
}

const staticFileMiddleware = express.static('wwwroot/dist')

/**
 * @type {RequestHandler}
 */
const requestForwardMiddleware = async (req, res, next) => {
  if (/^\/api/.test(req.path)) {
    next()
  } else {
    historyMiddleware(req, res, next)
  }
}

module.exports = {
  staticFileMiddleware,
  requestForwardMiddleware,
  rendererMiddleware
}
