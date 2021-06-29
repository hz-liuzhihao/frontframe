const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: [path.resolve(__dirname, '../src/index.js')],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[hash:5].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        common: {
          name: 'common',
          test: /[\\/]components[\\/]/,
          priority: -20,
          chunks: 'all'
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all'
        }
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|mp4)$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 20,
          },
        },
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  //处理路径解析
  resolve: {
    //extensions 拓展名
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    new WebpackBar(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].[hash:5].css',
      ignoreOrder: true
    }),
    new CleanWebpackPlugin(),
  ],
};
