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

const create = (req, res) => {
  const rentalData = req.body;
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

module.exports = {
  getRentals,
  getRentalById,
  create,
};
