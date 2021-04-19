const router = require('express').Router()
const bodyParser = require('body-parser')
// const fs = require('fs')
// const cookieParser = require('cookie-parser')
// router.use(cookieParser())
// router.use(require('helmet')())
router.use(bodyParser.json())

const exportsObject = require('../renderer')

router.get('/author', (req, res) => {
  res.send({
    name: 'icebreaker',
    email: '1324318532@qq.com',
    site: 'https://www.icebreaker.top/'
  })
})
router.get('/pdf/:url', async (req, res) => {
  const { url } = req.params
  console.log(`url: ${url}`)
  const page = await exportsObject.browser.newPage()
  await page.goto(url)

  const buf = await page.pdf()
  res.setHeader('Content-Type', 'application/pdf')
  res.send(buf)

  page.close()
})

// const ts = Date.now()
// const pdfPath = `/tmp/${ts}.pdf`
// res.sendFile(buf)
// fs.unlinkSync(pdfPath)
// res.setHeader('Content-Type', 'application/pdf')
// res.send(buf)
// console.log(`buffur size : ${buf.byteLength}`)
module.exports = router
