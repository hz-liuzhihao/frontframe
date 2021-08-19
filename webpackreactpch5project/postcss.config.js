module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-plugin-px2rem")({
      rootValue: 100,
      propWhiteList: ["font-size"]
    }),
  ],
};
