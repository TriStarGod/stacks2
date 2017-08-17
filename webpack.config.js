// import { resolve } from 'path';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';
// import webpack from 'webpack';

const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
// webpack is input, process, then output

module.exports = {
  // base directory to resolve entry points regardless of OS
  context: resolve(__dirname, 'src'),
  // starting point for app and followings import to other files
  entry: [
    'react-hot-loader/patch',
    'react-hot-loader/babel',
    'webpack-hot-middleware/client',
    './client/index',
  ],
  // output to
  output: {
    filename: 'js/build.js',
    // resolves path for public and javascripts folder
    path: '/',
    // publicPath will serve all files from the specified directory
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|public\/)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /(public\/)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|public\/)/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
          }],
          // use style-loader in development
          fallback: 'style-loader',
        }),
      },
    ],
  },
  // what extensions to pay attention to
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  performance: {
    hints: 'warning',
  },
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),
    // path to output css
    new ExtractTextPlugin('css/style.css'),
  ],
  node: {
    net: 'empty',
    dns: 'empty',
  },
};
