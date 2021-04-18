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

const exportsObject = {
  createRenderer,
  renderer,
  browser
}
async function createRenderer (config) {
  exportsObject.browser = await puppeteer.launch({ args: config.puppeteerArgs })
  exportsObject.browser.on('disconnected', () => {
    createRenderer(config)
  })
  exportsObject.renderer = new Renderer(exportsObject.browser, config)
  return exportsObject.renderer
}

module.exports = exportsObject
