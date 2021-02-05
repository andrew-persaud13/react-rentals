const express = require('express');
const { createBooking } = require('../controllers/bookings');
const { onlyAuthUser } = require('../controllers/users');
const { isUserRentalOwner } = require('../controllers/rentals');
const router = express.Router();

router.post('/', onlyAuthUser, isUserRentalOwner, createBooking);

module.exports = router;
