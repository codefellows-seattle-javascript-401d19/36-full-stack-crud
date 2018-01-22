'use strict';

const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: `${__dirname}/src/main.js`,
  output: {
    path: `${__dirname}/src/build`,
    filename: 'bundle.[hash].js',
  },
  plugins: [
    new htmlWebpackPlugin(),
    new extractTextPlugin('bundle.[hash].scss'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader',
      },
    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
  },
};
