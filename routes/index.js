const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const User = require('../models/User');
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');
const uploader = require('../config/cloudinary-setup');

const authCheck = (req, res, next) => {
  let token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) return res.status(403).send('Unauthenticated');
  const decoded = jwt.verify(token, process.env.token);
  if (!decoded) res.status(403).send('Unauthenticated');

  User.findById(decoded.id)
    .then((user) => {
      if (!user) res.status(403).send('Unauthenticated');
      else next();
    })
    .catch((err) => console.log(err, 'Error'));
};

// GET ALL PROPERTIES
router.get('/properties', (req, res) => {
  Property.find()
    .then((properties) => res.status(200).json(properties))
    .catch((err) =>
      res.status(500).json({ message: 'Route Error', error: err })
    );
});

// SUBMIT NEW BOOKING
router.post('/properties/:id/reserve', authCheck, (req, res, next) => {
  Booking.create({ ...req.body })
    .then(() => res.send('New Booking Submitted'))
    .catch((err) => res.status(500).send('Submission Error' + err));
});

// SUBMIT NEW PROPERTY
router.post(
  '/properties',
  authCheck,
  uploader.single('photos'),
  (req, res, next) => {
    Property.create({ ...req.body, photos: req.file.path })
      .then(() => res.send('New Property Submitted'))
      .catch((err) => res.status(500).send('Submission Error' + err));
  }
);

// UPDATE EXISTING PROPERTY
router.put('/properties/:id', authCheck, (req, res, next) => {
  Property.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      debugger;
      res.send('Property Updated');
    })
    .catch((err) => {
      debugger;
      console.log('Update Submission Error', err);
    });
});

// FOR PICTURE UPLOADS (NEWCABINS)
router.post('/properties/photos', uploader.single('photos'), (req, res) => {
  Property.findByIdAndUpdate(req.params.id, {
    photos: req.file.path,
  })
    .then((user) => res.send('Picture Uploaded'))
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error');
    });
});

// FOR PICTURE UPLOADS
router.put('/properties/:id/photos', uploader.single('photos'), (req, res) => {
  Property.findByIdAndUpdate(req.params.id, {
    photos: req.file.path,
  })
    .then((user) => res.send('Picture Uploaded'))
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error');
    });
});

// VIEW DETAILS OF INDIVIDUAL PROPERTY
router.get('/properties/:id', (req, res) => {
  Property.findById(req.params.id)
    .then((property) => {
      if (!property)
        res.status(404).json({ message: 'No matching property found' });
      else res.json(property);
    })
    .catch((err) =>
      res.status(500).json({ message: 'Route Error', error: err })
    );
});

module.exports = router;
