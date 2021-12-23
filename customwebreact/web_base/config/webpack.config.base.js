const path = require("path");
const os = require("os");
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require("webpackbar");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  output: {
    path: path.resolve(__dirname, "../build"),
  },
  optimization: {
    splitChunks: {
      name: true,
      automaticNameDelimiter: ".",
      cacheGroups: {
        default: false,
        vender: {
          name: "vender",
          test: /[\\/]node_modules[\\/](?!echarts[\\/])/,
          chunks: "all",
          priority: 20,
          minChunks: 1,
          // minSize: 1024 * 1024 * 1.4,
          // maxSize: 1024 * 1024 * 4.6,
        },
        common: {
          name: "common",
          test: /[\\/]tbdx-crm-base[\\/]|([\\/]node_modules[\\/]echarts[\\/])/,
          chunks: "all",
          minChunks: 2,
          priority: 5,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "> 5%",
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
              "@babel/preset-react",
            ],
            plugins: [
              [
                resolve("../plugins/babel-plugin-import-replace.js"),
                {
                  rely: process.env.rely,
                },
              ],
              "@babel/plugin-transform-runtime",
              "@babel/plugin-syntax-dynamic-import",
            ],
            comments: false,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: "happypack/loader?id=happybabel",
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/, /\.min\.css/],
        use: [
          process.env.ENV == "pro"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: [/node_modules/, /\.min\.css$/],
        use: [
          process.env.ENV == "pro"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          process.env.ENV == "pro"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [],
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          process.env.ENV == "pro"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [],
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: "url-loader?limit=1024",
      },
    ],
  },
  plugins: [
    new OptimizeCSSAssetsPlugin(),
    new WebpackBar(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css",
    }),
    new VueLoaderPlugin(),
    new HappyPack({
      id: "happybabel",
      loaders: ["babel-loader"],
      threadPool: happyThreadPool,
      verbose: true,
    }),
    new BundleAnalyzerPlugin(),
  ],
};
