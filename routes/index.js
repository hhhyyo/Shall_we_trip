const express = require('express');
const users = require('./users');
const trips = require('./trips');
const expenses = require('./expenses');

const router = express.Router();

router.use('/users', users);
router.use('/trips', trips);
router.use('/expenses', expenses);

module.exports = router;
