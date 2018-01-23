'use strict';

const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webPackConfig = (module.exports = {});

webPackConfig.entry = `${__dirname}/src/main.js`;
webPackConfig.output = {
  filename: 'bundle.[hash].js',
  path: `${__dirname}/build`,
};

webPackConfig.plugins = [new HTMLPlugin(), new ExtractTextPlugin('bundle.[hash].css')];

webPackConfig.module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        use: [
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [`${__dirname}/src/style`],
            },
          },
        ],
      }),
    },
  ],
};

webPackConfig.devtool = 'eval-source-map';

webPackConfig.devServer = {
  historyApiFallback: true,
};
