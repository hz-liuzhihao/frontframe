const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpackBaseConfig = require("../../tbdx-crm-base/config/webpack.config.base");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = merge(webpackBaseConfig, {
  mode: "production",
  entry: {
    main: "@/main",
  },
  output: {
    path: resolve("../dist"),
    publicPath: "",
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ["common", "main"],
      title: "markdown编辑器",
      template: "../template/index.ejs",
      filename: "index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      "@": resolve("../src"),
      vue$: "vue/dist/vue.esm.js",
    },
  },
});
