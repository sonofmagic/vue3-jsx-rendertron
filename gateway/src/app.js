// const express = require('express')
// const rendertron = require('rendertron-middleware')

// const app = express()

// app.use(
//   rendertron.makeMiddleware({
//     proxyUrl: 'http://my-rendertron-instance/render'
//   })
// )

// app.use(express.static('files'))
// app.listen(8080)
const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const version = await browser.version()
  console.log(version)
  // Create a new incognito browser context.
  const context = await browser.createIncognitoBrowserContext()
  // Create a new page in a pristine context.
  const page = await context.newPage()
  // Do stuff
  const response = await page.goto('https://www.baidu.com/')

  console.log(response)
})()
