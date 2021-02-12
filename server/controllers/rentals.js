const Rental = require('../models/rental');
const Booking = require('../models/booking');
const moment = require('moment');

const getRentals = async (req, res) => {
  const { city } = req.query;
  const query = city ? { city: city.toLowerCase() } : {};
  console.log(query);
  try {
    return res.json(await Rental.find(query));
  } catch (err) {
    return Rental.sendError(res, {
      status: 422,
      detail: 'Cannot retrieve rentals',
    });
  }
};

const getRentalById = async (req, res) => {
  const { id } = req.params;

  const rental = await Rental.findById(id)
    .populate('owner', '-password -_id')
    .catch(err =>
      Rental.sendError(res, {
        status: 422,
        detail: 'Cannot retrieve rental',
      })
    );

  res.json(rental);
};

const verifyUser = async (req, res) => {
  const { user } = res.locals;
  const { rentalId } = req.params;
  console.log('verifying');
  try {
    const rental = await Rental.findById(rentalId).populate('owner');

    if (rental.owner._id.toString() !== user._id.toString()) {
      console.log('not beeps');
      return res.sendApiError({
        title: 'Rental Error',
        detail: 'Invalid user',
      });
    }

    return res.json({ status: 'verified' });
  } catch (error) {
    return res.mongoError(error);
  }
};

const getRentalsByUser = async (req, res) => {
  const { user } = res.locals;

  try {
    const rentals = await Rental.find({ owner: user }).populate('owner');

    res.json(rentals);
  } catch (error) {
    return res.mongoError(error);
  }
};

//access to user due to auth middleware---> res.locals.user
const create = (req, res) => {
  const rentalData = req.body;
  rentalData.owner = res.locals.user;
  Rental.create(rentalData, (error, rental) => {
    if (error) {
      return Rental.sendError(res, {
        status: 422,
        detail: 'Cannot create rental',
      });
    }

    return res.json({ message: `Rental with id ${rental._id} created` });
  });
};

const updateRental = async (req, res) => {
  const rentalData = req.body;
  const { id } = req.params;

  try {
    const rental = await Rental.findById(id).populate(
      'owner',
      '-password -__v'
    );

    if (rental.owner._id.toString() !== res.locals.user._id.toString()) {
      res.sendApiError({
        title: 'Rental Error',
        detail: 'You cannot edit a rental you do not own.',
      });
    }

    rental.set(rentalData);
    res.json(await rental.save());
  } catch (error) {
    return res.mongoError(error);
  }
};
const isUserRentalOwner = (req, res, next) => {
  const { rental } = req.body;

  if (!rental) {
    return res.sendApiError({
      title: 'Booking Error',
      detail: 'No rental specified.',
    });
  }

  Rental.findById(rental, (error, foundRental) => {
    if (error) {
      return res.mongoError(error);
    }

    if (foundRental.owner.toString() === res.locals.user._id.toString()) {
      return res.sendApiError({
        title: 'Booking Error',
        detail: 'Owners cannot book their own rental.',
      });
    }

    next();
  });
};

const deleteRental = async (req, res) => {
  const { rentalId } = req.params;
  const { user } = res.locals;

  try {
    const rental = await Rental.findOne({ _id: rentalId });

    if (rental.owner.toString() !== user._id.toString()) {
      return res.sendApiError({
        title: 'Rental Error',
        detail: 'You cannot delete a rental you do not own.',
      });
    }

    const bookings = await Booking.find({ rental: rentalId });

    if (bookings.length) {
      const isStartDateInFuture = bookings.some(
        booking => moment(booking.startAt).diff(moment(), 'days') > -1
      );

      if (isStartDateInFuture) {
        return res.sendApiError({
          title: 'Rental Error',
          detail: 'You cannot delete a rental that has an active booking.',
        });
      }
    }

    await Rental.findOneAndDelete({ _id: rentalId });

    return res.json({ _id: rentalId });
  } catch (error) {
    res.mongoError(error);
  }
};

module.exports = {
  getRentals,
  getRentalById,
  create,
  isUserRentalOwner,
  getRentalsByUser,
  deleteRental,
  updateRental,
  verifyUser,
};
