const express = require('express');
const router = express.Router();
const Calendar = require('../models/Calendar');
const uploader = require('../config/cloudinary-setup');

// FOR CREATING NEW CALENDARS
router.post('/calendars', uploader.single('calendar'), (req, res) => {
  Calendar.create({ calendar: req.file.path })
    .then((user) => res.send('Calendar Uploaded'))
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error');
    });
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
