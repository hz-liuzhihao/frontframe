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
    main: "@@/main",
    apply: "@/pages/apply/index.js",
    course: "@/pages/course/index.js",
    pbList: "@/pages/pbList/index.js",
    links: "@/pages/links/index.js",
    message: "@/pages/message/index.js",
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
      chunks: ["vender", "common", "main"],
      title: "crm",
      template: "../tbdx-crm-base/template/index.ejs",
      filename: "main.html",
    }),
    new HtmlWebpackPlugin({
      chunks: ["vender", "common", "apply"],
      title: "crm",
      template: "../tbdx-crm-base/template/index.ejs",
      filename: "apply.html",
    }),
    new HtmlWebpackPlugin({
      chunks: ["vender", "common", "course"],
      title: "crm",
      template: "../tbdx-crm-base/template/index.ejs",
      filename: "course.html",
    }),
    new HtmlWebpackPlugin({
      chunks: ["vender", "common", "pbList"],
      title: "crm",
      template: "../tbdx-crm-base/template/index.ejs",
      filename: "pbList.html",
    }),
    new HtmlWebpackPlugin({
      chunks: ["vender", "common", "links"],
      title: "crm",
      template: "../tbdx-crm-base/template/index.ejs",
      filename: "links.html",
    }),
    new HtmlWebpackPlugin({
      chunks: ["vender", "common", "message"],
      title: "crm",
      template: "../tbdx-crm-base/template/index.ejs",
      filename: "message.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      "@": resolve("../src"),
      "@@": resolve("../../tbdx-crm-base"),
    },
  },
});
