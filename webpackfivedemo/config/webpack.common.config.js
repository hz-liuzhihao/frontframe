const path = require("path");
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const isDev = process.env.NODE_ENV === 'dev';

const cssLoaders = (preNumber) => [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      sourceMap: isDev,
      importLoaders: preNumber
      // modules: true css模块化
    },
  },
]

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[chunkhash:8].chunk.js",
    path: path.resolve(__dirname, "../dist"),
    clean: true
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ]
  },
  externals: {
    lodash: '_',
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: cssLoaders(0),
      },
      {
        test: /\.less$/i,
        use: [
          ...cssLoaders(1),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            },
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
      {
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '管理输出',
      template: 'public/index.html',
      inject: 'body'
    }),
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css',
      chunkFilename: 'css/[name].[chunkhash:8].css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', 'json']
  }
};
