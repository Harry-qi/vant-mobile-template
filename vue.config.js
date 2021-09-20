const setting = require('./src/setting.js')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: 'dist',
  configureWebpack: {
    name: setting.title,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
