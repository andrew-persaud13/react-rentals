const express = require('express');

const router = express.Router();

const {
  getRentals,
  getRentalById,
  create,
  getRentalsByUser,
  deleteRental,
} = require('../controllers/rentals');
const { onlyAuthUser } = require('../controllers/users');

router.get('/', getRentals);
router.get('/me', onlyAuthUser, getRentalsByUser);
router.get('/:id', getRentalById);
router.post('/', onlyAuthUser, create);
router.delete('/:rentalId', onlyAuthUser, deleteRental);

module.exports = router;
