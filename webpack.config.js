const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  context: __dirname,
  target: "web",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'presentation-forage-models.js',
    publicPath: '/dist/',
    library: "presentation-forage-models",
    globalObject: 'this',
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  externals: {
    'next-core-model': {
      commonjs: 'next-core-model',
      commonjs2: 'next-core-model',
      amd: 'next-core-model',
      root: 'next-core-model'
    },
    'localforage': {
      commonjs: 'localforage',
      commonjs2: 'localforage',
      amd: 'localforage',
      root: 'localforage'
    }
  },
  stats: "errors-only",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    })
  ]
};
