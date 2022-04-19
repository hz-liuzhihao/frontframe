const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpackBaseConfig = require("./webpack.config.base");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = merge(webpackBaseConfig, {
  mode: "production",
  entry: {
    main: "@/app",
  },
  output: {
    path: resolve("../../renderer"),
    publicPath: "",
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ["common", "main"],
      title: "markdown编辑器",
      template: "./src/template/index.ejs",
      filename: "index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      "@": resolve("../"),
    },
  },
});
