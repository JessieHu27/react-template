const { merge } = require("webpack-merge");
const base = require("./webpack.config");
// const { DefinePlugin } = require('webpack')
console.log("+++++++++++++++++");
console.log(process.env.NODE_ENV);

module.exports = merge(base, {
  mode: "development",
  devtool: "sourcemap",
  plugins: [],
});
