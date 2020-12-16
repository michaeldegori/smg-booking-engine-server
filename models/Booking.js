const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Property = require('./Property');
const User = require('./User');

const bookingSchema = new Schema({
  property: { type: Schema.Types.ObjectId, ref: 'Property' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  checkinDate: Date,
  checkoutDate: Date,
});

module.exports = mongoose.model('Booking', bookingSchema, 'bookings');
