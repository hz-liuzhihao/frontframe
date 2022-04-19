const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpackConfig = require("./webpack.config.base");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = merge(webpackConfig, {
  mode: "development",
  devtool: "#source-map",
  entry: {
    main: "@/app",
  },
  output: {
    path: resolve("../../renderer"),
    publicPath: "",
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  devServer: {
    disableHostCheck: true,
    port: 8057,
    compress: true,
    host: "0.0.0.0",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ["common", "main"],
      title: "markdown编辑器",
      template: "../template/index.ejs",
      filename: "index.html",
    }),
    new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      "@": resolve("../src"),
      vue$: "vue/dist/vue.esm.js",
    },
  },
});