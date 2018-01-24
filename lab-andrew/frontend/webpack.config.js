'use strict';

const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');

const webPackConfig = module.exports = {};

webPackConfig.entry = `${__dirname}/src/main.js`;

webPackConfig.output = {
  filename: 'bundle.[hash].js',
  path: `${__dirname}/build`,
};

webPackConfig.plugins = [
  new HTMLPlugin(),
  new ExtractPlugin({filename: 'bundle.[hash].css', disable: process.env.NODE_ENV !== 'production'}),
];

webPackConfig.module = { 
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.scss$/,
      loader: ExtractPlugin.extract({
        fallback: 'style-loader',
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