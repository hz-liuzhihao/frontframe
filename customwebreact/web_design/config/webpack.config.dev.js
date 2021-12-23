const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpackConfig = require("../../tbdx-crm-base/config/webpack.config.base");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = merge(webpackConfig, {
  mode: "development",
  devtool: "#source-map",
  entry: {
    index: "@/index.js",
  },
  output: {
    path: resolve("../build"),
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  devServer: {
    disableHostCheck: true,
    port: 8057,
    compress: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ["vender", "common", "index"],
      title: "crm",
      template: "./template/index.ejs",
      filename: "index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      "@": resolve("../src"),
      "@@": resolve("../../web_base"),
    },
  },
});
