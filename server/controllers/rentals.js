const Rental = require('../models/rental');

const getRentals = async (req, res) => {
  try {
    return res.json(await Rental.find({}));
  } catch (err) {
    return Rental.sendError(res, {
      status: 422,
      detail: 'Cannot retrieve rentals',
    });
  }
};

const getRentalById = async (req, res) => {
  const { id } = req.params;

  Rental.findById(id, (err, rental) => {
    if (err) {
      return Rental.sendError(res, {
        status: 422,
        detail: 'Cannot retrieve rental',
      });
    }

    return res.json(rental);
  });
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

const isUserRentalOwner = (req, res, next) => {
  const { rental } = req.body;

  Rental.findById(rental, (error, foundRental) => {
    if (error) {
      return res.mongoError(error);
    }
    console.log(foundRental.owner === res.locals.user._id);

    if (foundRental.owner.toString() === res.locals.user._id.toString()) {
      return res.sendApiError({
        title: 'Booking Error',
        detail: 'Owners cannot book their own rental.',
      });
    }

    next();
  });
};

module.exports = {
  getRentals,
  getRentalById,
  create,
  isUserRentalOwner,
};
