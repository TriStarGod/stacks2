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
    './client/index',
  ],
  // output to
  output: {
    filename: 'public/js/build-prod.js',
    // resolves path for public and javascripts folder
    path: resolve(__dirname),
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
    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),
    // path to output css
    new ExtractTextPlugin('public/css/style-prod.css'),
    // minifies files
    new webpack.optimize.UglifyJsPlugin(),
  ],
  // // if using jsonwebtoken on browser side, note that jsonwebtoken uses 
  // // dependencies net and isemail that isn't available to the browser 
  // // (should get error on compile); in webpack, add node > net & dns 'empty' to resolve
  // node: {
  //   net: 'empty',
  //   dns: 'empty',
  // },
};
