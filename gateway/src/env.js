const isProd = process.env.NODE_ENV === 'production'
const isRelease = process.env.SLS_ENV === 'release'
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  isProd,
  isRelease,
  isDev
}
