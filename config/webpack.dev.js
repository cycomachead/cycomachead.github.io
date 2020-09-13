/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(CommonConfig, {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('assets'),
    publicPath: '/assets/',
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },
  devServer: {
    contentBase: [
      path.resolve('_site'),
    ],
    hot: true,
  },
});
