const { createRenderer } = require('./renderer')
const { ConfigManager } = require('rendertron/build/config')

module.exports = async () => {
  const config = await ConfigManager.getConfiguration()
  await createRenderer(Object.assign({}, config))
}
