const merge = require('webpack-merge');
const common = require('./webpack.base.config');
const path = require('path');

module.exports = merge(common, {
  name: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[hash:5].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 3333,
    host: '0.0.0.0',
    hot: true,
    open: true,
  }
});