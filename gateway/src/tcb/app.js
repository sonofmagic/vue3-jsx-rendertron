const tcb = require('@cloudbase/node-sdk')
const {
  TENCENT_CLOUDBASE_ENVID,
  TENCENT_SECRET_ID,
  TENCENT_SECRET_KEY
} = require('../env')
const app = tcb.init({
  secretId: TENCENT_SECRET_ID,
  secretKey: TENCENT_SECRET_KEY,
  env: TENCENT_CLOUDBASE_ENVID
})
module.exports = app
