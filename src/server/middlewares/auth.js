import jwt from 'jsonwebtoken';

import User from '../../client/models/user';
// middleware is just function that takes req, res, and next
// req = request, res = result, next = callback function that calls the next function in the chain
export default (req, res, next) => {
  // get auth (jwt) token
  const authHeader = req.headers.authorization;
  let token;
  // if authHeader exists
  if (authHeader) {
    // note authHeader has "Bearer: <<<TOKEN>>>"; We just need the token;
    token = authHeader.split(' ')[1]; // split string by space and get second string which is token;
  }
  if (token) {
    // validate token
    jwt.verify(token, process.env.JWTSECRET, (error, decoded) => {
      if (error) {
        // error in jwt token verification
        res.status(401).json({ error: 'Failed authentication' });
      } else {
        // find user
        // new User({ id: decoded.id 
        User.query({
          select: ['email', 'id', 'username'],
          where: { id: decoded.id },
        }).fetch().then((user) => {
          if (!user) {
            // may not find user if user was deleted or blocked
            res.status(404).json({ error: 'No such user' });
          }
          // set user in req for future use
          req.currentUser = user;
          // continue chain
          next();
        });
      }
    });
  } else {
    // respond with error if no token
    res.status(403).json({
      error: 'No token provided',
    });
  }
};
