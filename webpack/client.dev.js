const path = require("path");
const webpack = require("webpack");
// here so you can see what chunks are built
const WebpackBar = require('webpackbar');
const WriteFilePlugin = require("write-file-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

module.exports = {
  name: "client",
  target: "web",
  devtool: "inline-source-map",
  mode: "development",
  entry: [
    "webpack-hot-middleware/client?path=/__webpack_hmr",
    "react-hot-loader/patch",
    "@babel/polyfill",
    path.resolve(__dirname, "../client"),
  ],
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "../buildClient"),
    publicPath: "/static/",
  },
  cache: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              hot: true,
              reloadAll: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]__[local]--[hash:base64:5]",
            },
          },
          {
            loader: "stylus-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".css"],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    // new WriteFilePlugin(),
    new ExtractCssChunks(),
    new WebpackBar(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
};
