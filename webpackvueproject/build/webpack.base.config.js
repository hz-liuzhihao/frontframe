const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
    chunkFilename: "[name].[hash:5].js",
    publicPath: "",
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 0,
      cacheGroups: {
        name: "vendor",
        test: /[\\/]node_modules[\\/]/,
        priority: 10,
        chunks: "initial",
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 5000,
              name: "imgs/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: "happypack/loader?id=happyBabel",
        exclude: /node_modules/,
      },
    ],
  },
};
