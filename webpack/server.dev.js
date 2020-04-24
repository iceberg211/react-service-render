const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack')
// const WriteFilePlugin = require('write-file-webpack-plugin') // 

const res = p => path.resolve(__dirname, p)
const entry = res('../server/render')

const dist = path.join(__dirname, '../dist')
const serverConfig = {
  target: 'node',
  name: 'server',
  mode: 'development',
  entry: entry,
  output: {
    path: dist,
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  externals: [nodeExternals()],
  plugins: [
    // new WriteFilePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};

module.exports = serverConfig;