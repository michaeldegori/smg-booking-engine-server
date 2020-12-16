const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  photos: String,
  bedrooms: Number,
  bathrooms: Number,
  listingTitle: String,
  description: String,
  maxGuests: Number,
  address: String,
  directions: String,
  checkinInstructions: String,
  wifiDetails: String,
  houseManual: String,
  houseRules: String,
  cancellationPolicy: String,
});

module.exports = mongoose.model('Property', propertySchema, 'properties');
