const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// GET USER
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) res.status(404).json({ message: 'No matching user found' });
      else res.json(user);
    })
    .catch((err) =>
      res.status(500).json({ message: 'Route Error', error: err })
    );
});

// USER SIGNUP
router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) console.log('HASHING ERROR', err);
    else {
      User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthdate: req.body.date,
        email: req.body.email,
        password: hash,
      })
        .then((user) => {
          res.status(200).send('User Created');
        })
        .catch((err) => {
          res.status(500).send('User Creation Failed');
        });
    }
  });
});

//USER LOGIN
router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) res.status(403).send('Invalid Login Credentials');
    else if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, match) {
        if (err) res.status(500).send('Invalid Password');
        if (match) {
          const token = jwt.sign({ id: user._id }, process.env.token);
          res.json({
            token: token,
            user: {
              firstName: user.firstName,
              lastName: user.lastName,
              birthdate: user.birthdate,
              email: user.email,
            },
          });
        } else res.status(403).send('Invalid credentials');
      });
    } else {
      res.status(403).send('Invalid credentials');
    }
  });
});

module.exports = router;
