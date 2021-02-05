const express = require('express');

const router = express.Router();

const { getRentals, getRentalById, create } = require('../controllers/rentals');
const { onlyAuthUser } = require('../controllers/users');

router.get('/', getRentals);
router.get('/:id', getRentalById);
router.post('/', onlyAuthUser, create);

module.exports = router;
