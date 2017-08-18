import auth from './api/auth';
import user from './api/user';
import task from './api/task';
// const auth = require('./api/auth');
// const user = require('./api/user');


// GET, POST, PUT, DELETE
export default function routes(app) {
  app.use('/api/auth', auth);
  app.use('/api/user', user);
  app.use('/api/task', task);
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
