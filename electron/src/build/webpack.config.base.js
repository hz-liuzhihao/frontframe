const path = require("path");
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
    path: path.resolve(__dirname, "../../renderer"),
  },
  optimization: {
    name: true,
    automaticNameDelimiter: ".",
    cacheGroups: {
      default: false,
      common: {
        name: "common",
        test: /[\\/]node_modules[\\/]/,
        chunks: "all",
        priority: 20,
        minChunks: 1,
        // minSize: 1024 * 1024 * 1.4,
        // maxSize: 1024 * 1024 * 4.6,
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
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
      new BundleAnalyzerPlugin(),
    ],
  },
};
