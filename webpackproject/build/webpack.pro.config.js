const merge = require('webpack-merge');
const common = require('./webpack.base.config');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[hash:5].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: 'http://www.baidu.com',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
});