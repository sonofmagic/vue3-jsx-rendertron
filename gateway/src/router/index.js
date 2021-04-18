const router = require('express').Router()
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// router.use(cookieParser())
// router.use(require('helmet')())
router.use(bodyParser.json())
const exportsObject = require('../renderer')

router.get('/pdf/:url', async (req, res) => {
  const { url } = req.params
  const page = await exportsObject.browser.newPage()
  await page.goto(url)
  const buf = await page.pdf()
  page.close()
  res.setHeader('Content-Type', 'application/pdf')
  res.send(buf)
})

module.exports = router
