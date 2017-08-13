// import User from '../../../client/models/user';
const User = require('../../../client/models/user');

module.exports = function Users(app) {
  app.get('/list', (req, res, next) => {
    User.find((err, users) => {
      if (err) {
        return res.send(err);
      }
      return res.json(users);
    });
  });
};
