const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const User = require('../models/User');
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

module.exports = router;
