const express = require('express');

const router = express.Router();

// MOCK 데이터
const expenses = [
  {
    expenseId: 1,
    tripId: 13,
    title: '가방',
    category: 'shopping',
    paymentMethod: 'cash',
    cost: 45,
    date: '10-31 13:18',
  },
  { expenseId: 2, tripId: 13, title: '기부', category: 'etc', paymentMethod: 'card', cost: 20, date: '10-26 13:18' },
  { expenseId: 3, tripId: 13, title: '옷', category: 'shopping', paymentMethod: 'cash', cost: 34, date: '10-31 13:18' },
];

router.get('/', (req, res) => {
  res.send(expenses);
});

module.exports = router;
