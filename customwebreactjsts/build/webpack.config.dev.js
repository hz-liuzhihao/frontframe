const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzePlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackConfig = require('./webpack.config.base');
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: '#source-map',
  entry: { app: '@/index.js' },
  output: {
    path: resolve('../dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  devServer: { disableHostCheck: true, port: 8058, compress: true },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['vender', 'app'],
      title: '讲师系统机构端',
      template: './public/index.html',
    }),
    new BundleAnalyzePlugin({ analyzerPort: 8889 }),
  ],
  resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'], alias: { '@': resolve('../src') } },
});
