// import User from '../../../client/models/user';
const express = require('express');

const User = require('../../../client/models/user');

const router = express.Router();

router.get('/', (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.send(err);
    }
    return res.json(users);
  });
});

module.exports = router;
