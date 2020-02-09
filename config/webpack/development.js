process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

environment.plugins.append('Progress', new SimpleProgressWebpackPlugin({
  format: 'minimal'
}))

module.exports = environment.toWebpackConfig()
