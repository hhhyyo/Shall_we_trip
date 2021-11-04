const express = require('express');

const router = express.Router();

// MOCK 데이터
const trips = [
  {
    tripId: 1,
    userId: 13,
    country: '미국',
    title: '즐거운 여행',
    budget: 300,
    cashTotal: 0,
    cardTotal: 0,
    currency: '달러',
    startDate: '2021-11-01',
    endDate: '2021-11-10',
  },
  {
    tripId: 2,
    userId: 13,
    country: '일본',
    title: '즐거운 여행',
    budget: 500,
    cashTotal: 50,
    cardTotal: 400,
    currency: '달러',
    startDate: '2020-11-03',
    endDate: '2020-12-10',
  },
];

// GET /trips/id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const trip = trips.filter(trip => trip.tripId === +id);

  res.send(trip);
});

module.exports = router;
