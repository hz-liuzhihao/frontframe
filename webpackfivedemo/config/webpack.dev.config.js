const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // 终端仅打印error
    stats: 'errors-only',
    // 日志等级
    clientLogLevel: 'silent',
    // gzip压缩
    compress: true,
    disableHostCheck: true
  }
});