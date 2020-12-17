const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authCheck = (req, res, next) => {
  let token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) return res.status(403).send('Unauthenticated');
  const decoded = jwt.verify(token, process.env.token);
  if (!decoded) res.status(403).send('Unauthenticated');

  User.findById(decoded.id)
    .then((user) => {
      if (!user) res.status(403).send('Unauthenticated');
      else {
        req.user = user;
        next();
      }
    })
    .catch((err) => console.log(err, 'Error'));
};

module.exports = authCheck;
