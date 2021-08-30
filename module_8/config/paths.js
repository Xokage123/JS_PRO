const path = require('path')

module.exports = {
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, '../src/js'),
    build: path.resolve(__dirname, '../build')
}
