const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const src = path.resolve(root, 'dist/index.html')
const dest = path.resolve(root, '..', 'gateway/wwwroot/dist/index.html')

fs.copyFileSync(src, dest)

console.log('Ok')
