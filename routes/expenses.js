const express = require('express');

const router = express.Router();

// MOCK 데이터
let expenses = [
  {
    expenseId: 6,
    tripId: 2,
    title: '가방',
    category: 'shopping',
    paymentMethod: '현금',
    cost: 45,
    date: '2021-10-31 13:18',
  },
  {
    expenseId: 5,
    tripId: 2,
    title: '기부',
    category: 'etc',
    paymentMethod: '카드',
    cost: 20,
    date: '2021-10-26 13:18',
  },
  {
    expenseId: 4,
    tripId: 2,
    title: '옷',
    category: 'shopping',
    paymentMethod: '현금',
    cost: 34,
    date: '2021-10-31 13:18',
  },
  {
    expenseId: 3,
    tripId: 2,
    title: '차비',
    category: 'traffic',
    paymentMethod: '현금',
    cost: 45,
    date: '2021-10-31 13:18',
  },
  {
    expenseId: 2,
    tripId: 2,
    title: '박물관',
    category: 'tour',
    paymentMethod: '현금',
    cost: 20,
    date: '2021-10-26 13:18',
  },
  {
    expenseId: 1,
    tripId: 2,
    title: '호텔',
    category: 'accommodation',
    paymentMethod: '카드',
    cost: 34,
    date: '2021-10-31 13:18',
  },
];

const generateExpenseId = () => Math.max(...expenses.map(expense => expense.expenseId), 0) + 1;

router.get('/', (req, res) => {
  const { tripId, category } = req.query;
  let expensesList = expenses.filter(expense => expense.tripId === +tripId);

  expensesList = category ? expensesList.filter(expense => expense.category === category) : expensesList;

  res.send(expensesList);
});

router.post('/', (req, res) => {
  const newExpense = { expenseId: generateExpenseId(), ...req.body };
  expenses = [newExpense, ...expenses];

  res.send(expenses);
});

module.exports = router;
