const moment = require('moment');
const Booking = require('../models/booking');
const Rental = require('../models/rental');

const DAYS_THRESHOLD = 3;

exports.getBookingsByRental = async (req, res) => {
  const { rentalId } = req.params;

  const bookings = await Booking.find({ rental: rentalId }).catch(error =>
    res.mongoError(error)
  );

  res.json({ bookings });
};

exports.getBookingsByUser = async (req, res) => {
  const { user } = res.locals;
  console.log(moment('2029-01-01').diff(moment(), 'days'));
  try {
    const bookings = await Booking.find({ owner: user })
      .populate('owner', '-password')
      .populate('rental');
    res.json(bookings);
  } catch (error) {
    return res.mongoError(error);
  }
};

exports.getBookingsForRentalOwner = async (req, res) => {
  const { user } = res.locals;

  try {
    const userRentals = await Rental.find({ owner: user });
    const rentalIds = userRentals.map(rental => rental._id);
    const bookings = await Booking.find({ rental: { $in: rentalIds } })
      .populate('owner', '-password')
      .populate('rental');
    return res.json(bookings);
  } catch (error) {
    res.mongoError(error);
  }
};

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

exports.deleteBooking = async (req, res) => {
  const { user } = res.locals;
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findOne({ _id: bookingId });
    //Reasons cannot delete ==> booking not found, not the one who made the booking, too soon to date to cancel
    if (!booking)
      return res.sendApiError({
        title: 'Booking Error',
        detail: 'Booking does not exist.',
      });

    if (!(booking.owner.toString() === user._id.toString())) {
      return res.sendApiError({
        title: 'Booking Error',
        detail: 'You can only delete your own bookings.',
      });
    }

    if (moment(booking.startAt).diff(moment(), 'days') <= DAYS_THRESHOLD) {
      return res.sendApiError({
        title: 'Booking Error',
        detail:
          'You cannot delete this booking within 3 days of start date. Please contact administration',
      });
    }

    //all good
    await Booking.findOneAndDelete({ _id: bookingId });
    return res.json({ _id: bookingId });
  } catch (error) {
    res.mongoError(error);
  }
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
