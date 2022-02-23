const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackBaseConfig = require('../../base/config/webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');
const { cdnPathDaily, cdnPath, pubpath } = process.env;
const branchNameMap = { module1: '模块1', module2: '模块2', module3: '模块3' };
function getCurrentInfo() {
  const names = shell.exec('git remote -v', { silent: true }).split('\n');
  const projectName = names[0]
    .split('/')
    .pop()
    .replace(/\.git(\s|\S)+$/, '');
  const branches = shell.exec('git branch', { silent: true }).split('\n');
  const currentBranch = branches.filter((e) => e.startsWith('*'))[0];
  const version = currentBranch.split('/').slice(1).join('/');
  if (version.indexOf(process.env.rely) < 0) {
    const branchName = branchNameMap[process.env.rely];
    console.error(
      chalk.red(
        `当前应该发布的是${branchName},分支却选择的是${currentBranch},请选择正确分支后再发布。`
      )
    );
    return process.exit(0);
  }
  return { version, projectName };
}
const environment = { daily: cdnPathDaily, prod: cdnPath };
const { version, projectName } = getCurrentInfo();
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  entry: { app: '@/index.js' },
  output: {
    path: resolve('../dist'),
    publicPath: environment[pubpath]
      ? `${environment[pubpath]}/${projectName}/${version}/`
      : '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['vender', 'common', 'app'],
      title: 'react框架',
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
  resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'], alias: { '@': resolve('../src') } },
});
