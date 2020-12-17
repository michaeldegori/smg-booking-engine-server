const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const uploader = require('../config/cloudinary-setup');
const mongoose = require('mongoose');

// FOR GETTING A BOOKING
router.get('/get-bookings/:id', (req, res) => {
  Booking.find({
    property: req.params.id,
  })
    .then((bookings) => res.status(200).json(bookings))
    .catch((err) =>
      res.status(500).json({ message: 'Route Error', error: err })
    );
});

// FOR CALENDAR UPLOADS
router.put('/calendars', uploader.single('calendar'), (req, res) => {
  Calendar.findByIdAndUpdate(req.params.id, {
    calendar: req.file.path,
  })
    .then((user) => res.send('Calendar Updated'))
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error');
    });
});

module.exports = router;
