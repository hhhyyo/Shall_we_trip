const express = require('express');
const trips = require('./trips');
const expenses = require('./expenses');

const router = express.Router();

router.use('/trips', trips);
router.use('/expenses', expenses);

module.exports = router;
