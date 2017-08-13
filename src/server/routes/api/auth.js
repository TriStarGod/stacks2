// import User from '../../../client/models/user';
const express = require('express');
const passport = require('passport');
const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

const User = require('../../../client/models/user');

const router = express.Router();

function validateInput(data) {
  console.log(data);
  const errors = {};
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  } 
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  } else if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'This field is required';
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'This field is required';
  }
  if (Validator.isEmpty(data.role)) {
    errors.role = 'This field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

router.post('/register', (req, res) => {
  // setTimeout(() => {
  //   const { errors, isValid } = validateInput(req.body);
  //   if (!isValid) {
  //     res.status(400).json(errors);
  //   }
  // }, 5000);
  const { errors, isValid } = validateInput(req.body);
  if (!isValid) {
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
