const express = require('express');

const router = express.Router();

// MOCK 데이터
const expense = [
  { expenseId: 1, tripId: 13, title: '가방', category: 'shopping', paymentMethod: 'cash', cost: 45, date: new Date() },
  { expenseId: 2, tripId: 13, title: '기부', category: 'etc', paymentMethod: 'card', cost: 20, date: new Date() },
  { expenseId: 3, tripId: 13, title: '옷', category: 'shopping', paymentMethod: 'cash', cost: 34, date: new Date() },
];

router.get('/', (req, res) => {
  res.send(expense);
});

module.exports = router;
