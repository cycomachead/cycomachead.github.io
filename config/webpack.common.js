/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
  entry: {
    app: './_src/js/app.js',
  },
  plugins: [
    // new FaviconsWebpackPlugin({
    //   logo: './icon.png',
    // }),
    new MiniCssExtractPlugin(), // '[name].css'
    new CopyWebpackPlugin([
      { from: path.resolve('_images'), to: 'images/', },
      { from: '_src/fonts', to: 'fonts' },
      { from: '_src/img', to: 'img' }
    ]),
    // jQuery and PopperJS
    new Webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery",
      "window.$": "jquery",
      Popper: ['popper.js', 'default']
    }),
  ],
  module: {
      rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
            { loader: MiniCssExtractPlugin.loader, options: { publicPath: 'assets/css/' } },
            { loader: 'css-loader', options: { importLoaders: 1 } },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: { config: true }
              },
            },
            { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
};
