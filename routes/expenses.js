const express = require('express');

const router = express.Router();

// MOCK 데이터
const expenses = [
  {
    expenseId: 1,
    tripId: 2,
    title: '가방',
    category: 'shopping',
    paymentMethod: '현금',
    cost: 45,
    date: '2021-10-31 13:18',
  },
  {
    expenseId: 2,
    tripId: 2,
    title: '기부',
    category: 'etc',
    paymentMethod: '카드',
    cost: 20,
    date: '2021-10-26 13:18',
  },
  {
    expenseId: 3,
    tripId: 2,
    title: '옷',
    category: 'shopping',
    paymentMethod: '현금',
    cost: 34,
    date: '2021-10-31 13:18',
  },
];

router.get('/', (req, res) => {
  const { tripId, category } = req.query;
  let expensesList = expenses.filter(expense => expense.tripId === +tripId);

  expensesList = category ? expensesList.filter(expense => expense.category === category) : expensesList;

  res.send(expensesList);
});

module.exports = router;
