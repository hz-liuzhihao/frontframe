const path = require("path");
const { ProgressPlugin } = require("webpack");

module.exports = {
  entry: {
    index: [path.resolve(__dirname, "../src/index.js")],
  },
  module: {
    rules: [
      {
        test: "",
        loader: "",
      },
    ],
  },
  plugins: [new ProgressPlugin({})],
};
