// import User from '../../../client/models/user';
const User = require('../../../client/models/user');

module.exports = function Authentication(app, passport) {
  // {
  //   "username": "someone",
  //   "password": "somePassword",
  //   "firstName": "some",
  //   "lastName": "one",
  //   "email": "some@email.com"
  // }
  // POST to /register
  app.post('/api/auth/register', (req, res) => {
    // Create a user object to save, using values from incoming JSON
    // user model prevents unwanted data from approaching our server
    const newUser = new User(req.body);
    // Passport register creates a salted hash of the user's password,
    // which prevents a compremised database from revealing the user's password
    // Save, via Passport's "register" method, the user
    User.register(newUser, req.body.password, (error, user) => {
      // If there's a problem, send back a JSON object with the error
      if (error) {
        return res.send(JSON.stringify({ error }));
      }
      // Otherwise, for now, send back a JSON object with the new user's info
      return res.send(JSON.stringify(user));
    });
  });

  // {
  //   "username": "someone",
  //   "password": "somePassword"
  // }
  // POST to /login
  app.post('/api/auth/login', (req, res) => {
    passport.authenticate('local')(req, res, () => {
      // If logged in, we should have user info to send back
      if (req.user) {
        return res.send(JSON.stringify(req.user));
      }
      // Otherwise return an error
      return res.send(JSON.stringify({ error: 'There was an error logging in.' }));
    });
  });
  // GET to /logout
  app.get('/logout', (req, res) => {
    // console.log(req.user);
    req.logout();
    // console.log(req.user);
    return res.send(JSON.stringify(req.user));
  });
};
