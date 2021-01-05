const merge = require('webpack-merge');
const common = require('./webpack.base.config');
const path = require('path');

module.exports = merge(common, {
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3333,
    host: '127.0.0.1',
    hot: true,
    open: true,
  }
});