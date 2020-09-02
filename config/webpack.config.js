const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HMR = require("webpack").HotModuleReplacementPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const resolve = (dir) => path.resolve(__dirname, "../", dir);
const noop = () => {};
const isProd = process.env.NODE_ENV === "procuction";

module.exports = {
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    filename: "[name][hash].js",
    path: resolve("dist"),
    chunkFilename: "[name][chunkhash].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@": resolve("src"),
    },
  },
  devServer: {
    host: "localhost",
    port: 3333,
    https: false,
    open: false,
    contentBase: resolve("dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ["babel-loader", "awesome-typescript-loader"],
      },
      {
        test: /\.(sc|sa|c)ss$/,
        include: resolve("src"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "css",
              hmr: !isProd,
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        include: resolve("src"),
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]_[hash:8].[ext]",
              outputPath: "images/",
              limit: 2048,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HMR(),
    new HtmlWebpackPlugin({
      template: resolve("public/index.html"),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css-[hash:8].css",
      chunkFilename: "[name].css",
      ignoreOrder: false,
    }),
  ],
};
