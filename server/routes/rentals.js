const express = require('express');

const router = express.Router();

const {
  getRentals,
  getRentalById,
  create,
  getRentalsByUser,
  deleteRental,
  updateRental,
  verifyUser,
} = require('../controllers/rentals');
const { onlyAuthUser } = require('../controllers/users');

router.get('/', getRentals);
router.get('/me', onlyAuthUser, getRentalsByUser);
router.get('/:id', getRentalById);
router.get('/:rentalId/verify-user', onlyAuthUser, verifyUser);
router.post('/', onlyAuthUser, create);
router.delete('/:rentalId', onlyAuthUser, deleteRental);
router.patch('/:id', onlyAuthUser, updateRental);

module.exports = router;
