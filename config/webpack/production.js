process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

const BabelMinifyPlugin = require('babel-minify-webpack-plugin')

environment.config.optimization.minimizer = [new BabelMinifyPlugin()]

environment.loaders.get('babel').exclude = ['**/__tests__', '**.*.test.js', environment.loaders.get('babel').exclude]

module.exports = environment.toWebpackConfig()
