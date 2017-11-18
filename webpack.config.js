const webpack = require('webpack');
const path = require('path');

const bundleConfig = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
};

const swConfig = {
  entry: './src/sw.js',
  output: {
    filename: 'sw.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
};

module.exports = [
  bundleConfig,
  swConfig
];
