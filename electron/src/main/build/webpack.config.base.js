module.exports = {
  entry: "../main.ts",
  output: {
    path: path.resolve(__dirname, "../../../main"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
