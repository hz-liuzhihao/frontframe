const merge = require('webpack-merge');
const common = require('./webpack.base.config');
const path = require('path');
const autoprefixer = require("autoprefixer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const Uglifyjs = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[hash:5].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin()],
    splitChunks: {
      chunks: "async",
      minSize: 0,
      cacheGroups: {
        name: "vendor",
        test: /[\\/]node_modules[\\/]/,
        priority: 10,
        chunks: "initial",
      },
    },
  },
  plugins: [
    autoprefixer,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].[hash:5].css",
    }),
    new HappyPack({
      //用id来标识 happypack处理类文件
      id: "happyBabel",
      //如何处理 用法和loader 的配置一样
      loaders: [
        {
          loader: "babel-loader?cacheDirectory=true",
        },
      ],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    }),
    new Uglifyjs()
  ]
});