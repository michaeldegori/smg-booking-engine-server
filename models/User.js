const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  birthdate: Date,
  phone: Number,
  email: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema, 'users');
