// // loading webserver modules
import express from 'express';
import { resolve } from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
// an approach for connecting express to our auth setup
import { Strategy as LocalStrategy } from 'passport-local';
import expressSession from 'express-session';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackDevMiddleware from 'webpack-dev-middleware';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack.config';
import routes from './routes';
import User from '../client/models/user';

require('dotenv').config();

const isNotProd = process.env.NODE_ENV !== 'production';
// require('es6-promise').polyfill(); // or require('es6-promise/auto');
// const express = require('express');
// const { resolve } = require('path');
// const favicon = require('serve-favicon');
// const logger = require('morgan');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// -- const mongoose = require('mongoose');
// const passport = require('passport');
// an approach for connecting express to our auth setup
// -- const LocalStrategy = require('passport-local').Strategy;
// const expressSession = require('express-session');
// eslint-disable-next-line import/no-extraneous-dependencies
// const webpack = require('webpack');
// eslint-disable-next-line import/no-extraneous-dependencies
// const webpackDevMiddleware = require('webpack-dev-middleware');
// eslint-disable-next-line import/no-extraneous-dependencies
// const webpackHotMiddleware = require('webpack-hot-middleware');

// const webpackConfig = require('../../webpack.config');
// const routes = require('./routes');
// const User = require('../client/models/user');

// instances of express server
const app = express();

// connect to mongoose
// mongoose.connect(process.env.MONGODB_URI);
// mongoose.createConnection(process.env.MONGODB_URI);

// view engine setup - where its found and use view engine ejs
app.set('views', resolve(__dirname, '../client/views'));
app.set('view engine', 'ejs');

// configures webserver
app.use(favicon('public/img/favicon.ico'));
// options available for logger: common, dev, short, tiny
if (isNotProd) {
  app.use(logger('dev')); // more rebust logs for debugging in dev
} else {
  app.use(logger('tiny'));
}
// parse incoming data; uses middleware - software that transforms data before it reaches your code;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// security setup
// express session middleware with config
app.use(expressSession({
  // save somewhere else; secret used to sign session requests to 
  // confirm that session requests are coming from the right place
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));
// // initialize and setup passpoert
// app.use(passport.initialize());
// // passport's session uses express session so it MUST come after
// app.use(passport.session());

if (isNotProd) {
  // Webpack Server
  // creates a webpack based on config
  const webpackCompiler = webpack(webpackConfig);
  // adds webpack as middleware
  app.use(webpackDevMiddleware(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      hot: true,
      colors: true,
      chunks: true,
      'errors-only': true,
    },
  }));
  app.use(webpackHotMiddleware(webpackCompiler, {
    // eslint-disable-next-line no-console
    log: console.log,
  }));
} else {
  //
}
// server anything in the public folder
app.use(express.static(resolve(__dirname, 'public')));

// route files
// routes(app, passport);
routes(app); // would make error handling (below) useless

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// configure passport
// passport.use(new LocalStrategy(User.authenticate)); // if login id is username
// passport.use(User.createStrategy()); // login id is anything but username (like email)
// to serialize means to identify the object (ie User) by a unique id
// passport.serializeUser(User.serializeUser());
// to deserialize means to use the id to obtain the full object (ie User)
// passport.deserializeUser(User.deserializeUser());

const server = app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://${server.address().address}:${server.address().port}`);
});
