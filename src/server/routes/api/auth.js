// const express = require('express');
// const passport = require('passport');
// const bcrypt = require('bcrypt');

// const validateInput = require('../../../client/validator/auth/register');
// const User = require('../../../client/models/user');

import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';

import validateInput from '../../shared/validator/auth/register';
import User from '../../../client/models/user';

const router = express.Router();

// import Promise from 'bluebird';
// // this serverValidation runs two queries
// // based on each query result, an error may be added
// // Promise.all waits for the queries before return results
// function serverValidation(data, otherValidations) {
//   const { errors } = otherValidations(data);
//   return Promise.all([
//     User.where({ email: data.email }).fetch().then((user) => {
//       if (user) { errors.email = 'Already in use'; }
//     }),
//     User.where({ username: data.username }).fetch().then((user) => {
//       if (user) { errors.username = 'Already in use'; }
//     }),
//   ])
//     .then(() => ({ errors, isValid: isEmpty(errors) }));
// }

// this serverValidation only runs one query and is more efficient than previous option
// validates that email and username values are unique
// consider transforming database errors to display on UI???
function serverValidation(data, otherValidations) {
  const { errors } = otherValidations(data);
  return User.query({
    where: { email: data.email },
    orWhere: { username: data.username },
  })
    .fetch().then((user) => {
      if (user) {
        if (user.get('username') === data.username) {
          errors.username = 'Already in use';
        }
        if (user.get('email') === data.email) {
          errors.email = 'Already in use';
        }
      }
      return { errors, isValid: isEmpty(errors) };
    });
}

router.post('/register', (req, res) => {
  // setTimeout(() => {
  //   const { errors, isValid } = validateInput(req.body);
  //   if (!isValid) {
  //     res.status(400).json(errors);
  //   }
  // }, 5000);
  // const { errors, isValid } = validateInput(req.body);
  serverValidation(req.body, validateInput).then(({ errors, isValid }) => {
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
  });
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

router.get('/exists/:id/:value', (req, res) => {
  const id = req.params.id;
  if (id !== 'username' && id !== 'email') {
    res.status(401); // Security alert
    return;
  }
  User.query({
    select: [id], // unnecessary?
    where: { [id]: req.params.value },
  }).fetch().then(user => res.json({ user: !!user })); // returns true or false
  // }).fetch().then(user => res.json({ user }));
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
