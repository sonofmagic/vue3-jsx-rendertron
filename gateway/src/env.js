const {
  NODE_ENV,
  SLS_ENV,
  TENCENT_CLOUDBASE_ENVID,
  TENCENT_SECRET_KEY,
  TENCENT_SECRET_ID
} = process.env
const isProd = NODE_ENV === 'production'
const isRelease = SLS_ENV === 'release'
const isDev = NODE_ENV === 'development'

module.exports = {
  isProd,
  isRelease,
  isDev,
  TENCENT_CLOUDBASE_ENVID,
  TENCENT_SECRET_KEY,
  TENCENT_SECRET_ID
}
