const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const WebpackBar = require('webpackbar');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  output: { path: resolve('../dist') },
  optimization: {
    splitChunks: {
      name: true,
      automaticNameDelimiter: '.',
      cacheGroups: {
        default: false,
        vender: {
          name: 'vender',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 20,
          minChunks: 1,
          // minSize: 1024 * 1024 * 1.4,
          // maxSize: 1024 * 1024 * 4.6,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.ts[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: '>5%',
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-transform-typescript',
              '@babel/plugin-proposal-object-rest-spread',
              [
                '@babel/plugin-proposal-decorators',
                {
                  legacy: true,
                },
              ],
              [
                '@babel/plugin-proposal-class-properties',
                {
                  loose: true,
                },
              ],
            ],
            comments: false,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          process.env.ENV == 'pro'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          process.env.ENV == 'pro'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          { loader: 'css-loader', options: { modules: true } },
          'postcss-loader',
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
        test: /\.(png|jpg|gif|mp4|woff|svg|eot|ttf)$/,
        exclude: /node_modules/,
        use: { loader: 'url-loader', options: { limit: 1024 } },
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=happybabel',
      },
    ],
  },
  plugins: [
    new OptimizeCSSAssetsPlugin(),
    new WebpackBar(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool,
      verbose: true,
    }),
  ],
};
