const router = require('express').Router()
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// router.use(cookieParser())
// router.use(require('helmet')())
router.use(bodyParser.json())

router.all('/', (req, res) => {
  res.send('This is api')
  const url = req.body
  // const fullURL = req.protocol + '://' + req.get('host') + req.originalUrl
  // res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader(
    `Content-Disposition', 'attachment; filename=${encodeURIComponent(url)}.pdf`
  )
  res.send()
})

module.exports = router
