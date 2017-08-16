// const express = require('express');
// const passport = require('passport');
// const bcrypt = require('bcrypt');

// const validateInput = require('../../../client/validator/auth/register');
// const User = require('../../../client/models/user');

import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';

import validateInput from '../../shared/validator/auth/register';
import User from '../../../client/models/user';

const router = express.Router();

router.post('/register', (req, res) => {
  // setTimeout(() => {
  //   const { errors, isValid } = validateInput(req.body);
  //   if (!isValid) {
  //     res.status(400).json(errors);
  //   }
  // }, 5000);
  const { errors, isValid } = validateInput(req.body);
  if (isValid) {
    const { email, username, password, firstName, lastName, role } = req.body;
    const passwordDigest = bcrypt.hashSync(password, 10);

    User.forge({
      email, username, firstName, lastName, role, passwordDigest,
    }, { hasTimestamps: true }).save()
      .then(() => res.json({ success: true }))
      .catch(error => res.status(500).json({ error }));
    // res.json({ success: true });
  } else {
    res.status(400).json(errors);
  }
  // // Create a user object to save, using values from incoming JSON
  // // user model prevents unwanted data from approaching our server
  // const newUser = new User(req.body);
  // // Passport register creates a salted hash of the user's password,
  // // which prevents a compremised database from revealing the user's password
  // // Save, via Passport's "register" method, the user
  // User.register(newUser, req.body.password, (error, user) => {
  //   // If there's a problem, send back a JSON object with the error
  //   if (error) {
  //     return res.send(JSON.stringify({ error }));
  //   }
  //   // Otherwise, for now, send back a JSON object with the new user's info
  //   return res.send(JSON.stringify(user));
  // });
});

router.post('/login', (req, res) => {
  passport.authenticate('local')(req, res, () => {
    // If logged in, we should have user info to send back
    if (req.user) {
      return res.send(JSON.stringify(req.user));
    }
    // Otherwise return an error
    return res.send(JSON.stringify({ error: 'There was an error logging in.' }));
  });
});

router.get('/logout', (req, res) => {
  // console.log(req.user);
  req.logout();
  // console.log(req.user);
  return res.send(JSON.stringify(req.user));
});

module.exports = router;
