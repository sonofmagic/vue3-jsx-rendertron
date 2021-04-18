const router = require('express').Router()
// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// router.use(cookieParser())
// router.use(require('helmet')())
// router.use(bodyParser.json())

router.all('/', (req, res) => {
  res.send('This is api')
})

module.exports = router
