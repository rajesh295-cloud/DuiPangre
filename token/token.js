const jwt = require('jsonwebtoken')
const token = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const tokens = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(
        tokens,
         'secrets',
        (err, decode) => {
          if (err) {
            res.status(401).send({ message: 'Invalid Token' });
          } else {
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: 'No Token' });
    }
  };


  module.exports = token;