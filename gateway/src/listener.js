const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
  path: path.resolve(process.cwd(), '.env')
})
const app = require('./app')
app.listen(8080)

console.log('http://127.0.0.1:8080')
