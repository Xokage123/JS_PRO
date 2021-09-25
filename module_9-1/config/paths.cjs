const path = require('path')

module.exports = {
  public: path.resolve(__dirname, '../public'),
  assets: path.resolve(__dirname, '../src/assets'),
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../build')
}
