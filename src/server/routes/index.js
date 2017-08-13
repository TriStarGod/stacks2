// import authentication from './api/authentication';
// import users from './api/users';
const Authentication = require('./api/auth');
const Users = require('./api/users');

// GET, POST, PUT, DELETE
module.exports = function Routes(app, passport) {
  Authentication(app, passport);
  Users(app);
  app.get('/*', (req, res) => {
    res.render('index', { title: `${process.env.APP_NAME} Alpha` });
  });
  // app.get('/500', () => {
  //   throw Error('Fake Internal Server Error');
  // });

  // app.get('*', (req, res) => {
  //   // res.status(404).send('Where are you going?');
  //   res.render('error', { message: 'hello' });
  // });

  // // eslint-disable-next-line no-unused-vars
  // app.use((err, req, res, next) => {
  //   // eslint-disable-next-line no-console
  //   console.error(err.stack);
  //   res.status(500).send('Something went wrong!');
  // });
};
