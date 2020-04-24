const path = require('path');
const nodeExternals = require(' ');
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin') // 


const res = p => path.resolve(__dirname, p)

const nodeModules = res('../node_modules')
const entry = res('../')
const output = res('../buildServer')

// const externals = fs
//   .readdirSync(nodeModules)
//   .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
//   .reduce((externals, mod) => {
//     externals[mod] = `commonjs ${mod}`
//     return externals
//   }, {})

const serverConfig = {
  target: 'node',
  name: 'server',
  mode: 'development',
  entry: entry,
  output: {
    path: path.resolve(__dirname, '../buildServer'),
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
    new WriteFilePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};

module.exports = serverConfig;