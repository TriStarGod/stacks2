// import authentication from './api/authentication';
// import users from './api/users';
const auth = require('./api/auth');
const users = require('./api/users');

// GET, POST, PUT, DELETE
module.exports = function Routes(app) {
  // auth(app, passport);
  app.use('/api/auth', auth);
  // users(app);
  app.use('/api/user', users);
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
