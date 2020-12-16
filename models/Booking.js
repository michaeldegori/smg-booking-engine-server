const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Property = require('./Property');

const bookingSchema = new Schema({
  property: { type: Schema.Types.ObjectId, ref: 'Property' },
  checkinDate: Date,
  checkoutDate: Date,
});

module.exports = mongoose.model('Property', propertySchema, 'properties');
