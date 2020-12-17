const mongoose = require('mongoose');

const CalendarSchema = mongoose.Schema({
  type: String,
  data: Buffer,
});

module.exports = mongoose.model('Calendar', CalendarSchema, 'calendars');
