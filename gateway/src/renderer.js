/**
 * @typedef {import('rendertron/build/renderer')} Renderer
 * @typedef {import('puppeteer').Browser} Browser
 */
const { Renderer } = require('rendertron/build/renderer')

const puppeteer = require('puppeteer')

/**
 * @type {Browser} browser
 */
let browser

/**
 * @type {Renderer} renderer
 */
let renderer

async function createRenderer (config) {
  browser = await puppeteer.launch({ args: config.puppeteerArgs })
  browser.on('disconnected', () => {
    createRenderer(config)
  })
  renderer = new Renderer(browser, config)
  return renderer
}

module.exports = {
  browser,
  renderer,
  createRenderer
}
