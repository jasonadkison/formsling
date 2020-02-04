process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

const BabelMinifyPlugin = require('babel-minify-webpack-plugin')

environment.config.optimization.minimizer = [new BabelMinifyPlugin()]

module.exports = environment.toWebpackConfig()
