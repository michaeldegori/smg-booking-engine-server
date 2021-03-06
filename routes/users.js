const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

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
router.post(
  '/signup',
  [
    check('firstName').not().isEmpty().withMessage('First name is required'),
    check('email').isEmail().normalizeEmail(),
    check('password').isStrongPassword(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(422).json({ errors: errors.array() });
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) console.log('HASHING ERROR', err);
      else {
        User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          birthdate: req.body.date,
          email: req.body.email,
          password: hash,
        })
          .then((user) => {
            res.status(200).send('User Created');
          })
          .catch((err) => {
            console.log(err);
            res
              .status(500)
              .send('User Creation Failed')
              .json({ err: err.toString() });
          });
      }
    });
  }
);

//USER LOGIN
router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) res.status(403).send('Invalid Login Credentials');
    bcrypt.compare(req.body.password, user.password, function (err, match) {
      if (err) return res.status(400).send('Invalid Password');
      if (!match) return res.status(403).send('Invalid credentials');
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
    });
  });
});

module.exports = router;
