const express = require('express');

const router = express.Router();

const { getRentals, getRentalById, create } = require('../controllers/rentals');

router.get('/', getRentals);
router.get('/:id', getRentalById);
router.post('/', create);

module.exports = router;
