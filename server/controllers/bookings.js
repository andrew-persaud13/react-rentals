const moment = require('moment');
const Booking = require('../models/booking');

exports.createBooking = async (req, res) => {
  const bookingData = req.body;
  bookingData.owner = res.locals.user;
  const booking = new Booking(bookingData);

  if (!validStartAndEndDate(booking)) {
    return res.sendApiError({
      title: 'Booking Error',
      detail: 'Invalid date selection.',
    });
  }

  const rentalBookings = await Booking.find({
    rental: booking.rental,
  }).catch(error => res.mongoError(error));

  if (!checkBookingValid(booking, rentalBookings)) {
    return res.sendApiError({
      title: 'Booking Error',
      detail: 'Date not available.',
    });
  }

  const savedBooking = await booking
    .save()
    .catch(error => res.mongoError(error));

  res
    .status(201)
    .json({ startAt: savedBooking.startAt, endAt: savedBooking.endAt });
};

const checkBookingValid = (pendingBooking, rentalBookings) => {
  let isValid = true;

  if (rentalBookings && rentalBookings.length) {
    isValid = rentalBookings.every(currentBooking => {
      const pendingStart = moment(pendingBooking.startAt);
      const pendingEnd = moment(pendingBooking.endAt);

      const currentStart = moment(currentBooking.startAt);
      const currentEnd = moment(currentBooking.endAt);

      return (
        (pendingStart < currentStart && pendingEnd < currentStart) ||
        (pendingStart > currentEnd && pendingEnd > currentEnd)
      );
    });
  }

  return isValid;
};

const validStartAndEndDate = booking => {
  if (!booking.startAt || !booking.endAt) return false;

  return moment(booking.startAt).valueOf() < moment(booking.endAt).valueOf();
};
