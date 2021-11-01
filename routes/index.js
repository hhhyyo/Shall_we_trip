const express = require('express');
const expense = require('./expense');

const router = express.Router();

router.use('/expense', expense);

module.exports = router;
