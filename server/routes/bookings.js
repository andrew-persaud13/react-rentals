const express = require('express');
const {
  createBooking,
  getBookingsByRental,
  getBookingsByUser,
  getBookingsForRentalOwner,
  deleteBooking,
} = require('../controllers/bookings');
const { onlyAuthUser } = require('../controllers/users');
const { isUserRentalOwner } = require('../controllers/rentals');
const router = express.Router();

router.post('/', onlyAuthUser, isUserRentalOwner, createBooking);
router.get('/me', onlyAuthUser, getBookingsByUser);
router.get('/received', onlyAuthUser, getBookingsForRentalOwner);
router.get('/:rentalId', getBookingsByRental);
router.delete('/:bookingId', onlyAuthUser, deleteBooking);

module.exports = router;
