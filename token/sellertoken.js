const jwt = require("jsonwebtoken")

const sellertoken = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const tokenizer = authorization.slice(7, authorization.length); 
      jwt.verify(
        tokenizer,
         'anysecrets',
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



module.exports = sellertoken;