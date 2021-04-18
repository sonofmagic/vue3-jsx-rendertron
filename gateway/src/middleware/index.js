/**
 * @typedef {import('express').RequestHandler} RequestHandler
 */
const express = require('express')
const history = require('connect-history-api-fallback')
const isbot = require('isbot')
const pageCacheCol = require('../tcb/pageCache')
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
  const ua = req.get('user-agent')
  const botFlag = isbot(ua)
  if (botFlag) {
    const fullURL = req.protocol + '://' + req.get('host') + req.originalUrl
    console.log(fullURL, ua)

    async function rendererWithInsetDb () {
      const result = await rendererMoudle.renderer.serialize(fullURL, true)
      res.send(result.content)
      await pageCacheCol.add({
        url: fullURL,
        ts: Date.now(),
        content: result.content
      })
    }

    const { data } = await pageCacheCol
      .where({
        url: fullURL
      })
      .get()
    if (data.length) {
      const hit = data[0]
      const ts = Date.now()
      // 半小时的cache
      if (ts - hit.ts <= 1000 * 60 * 30) {
        res.send(hit.content)
      } else {
        await rendererWithInsetDb()
      }
    } else {
      await rendererWithInsetDb()
    }
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
