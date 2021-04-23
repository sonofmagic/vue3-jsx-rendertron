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

    const { data } = await pageCacheCol
      .where({
        url: fullURL
      })
      .get()
    if (data.length) {
      const hit = data[0]
      // 由于实时渲染，又慢内存消耗又大，建议使用永久缓存，通过检测xhr获得数据的变化，手动去刷新缓存
      res.send(hit.content)
    } else {
      const result = await rendererMoudle.renderer.serialize(fullURL, true)
      res.send(result.content)
      await pageCacheCol.add({
        url: fullURL,
        userAgent: ua,
        ts: Date.now(),
        content: result.content
      })
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
