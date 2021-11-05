const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

// MOCK 데이터
let trips = [
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
    userId: 3,
    country: '미국',
    title: '그랜드 캐니언으로 대모험',
    budget: 2000,
    cashTotal: 50,
    cardTotal: 400,
    currency: '달러',
    startDate: '2020-11-03',
    endDate: '2020-12-10',
  },
  {
    tripId: 3,
    userId: 1,
    country: '스위스',
    title: '스위스 여행',
    budget: 500,
    cashTotal: 50,
    cardTotal: 400,
    currency: '프랑',
    startDate: '2020-11-03',
    endDate: '2020-12-10',
  },
  {
    tripId: 4,
    userId: 1,
    country: '대한민국',
    title: '제주도 여행',
    budget: 500,
    cashTotal: 50,
    cardTotal: 50,
    currency: '원',
    startDate: '2021-12-03',
    endDate: '2021-12-10',
  },
  {
    tripId: 5,
    userId: 1,
    country: '미국',
    title: '미국한달살기',
    budget: 150,
    cashTotal: 50,
    cardTotal: 0,
    currency: '달러',
    startDate: '2021-11-03',
    endDate: '2021-11-10',
  },
];

const generateId = () => Math.max(...trips.map(trip => trip.tripId), 0) + 1;

// GET /trips
router.get('/', (req, res) => {
  const tripList = trips.filter(trip => trip.userId === req.userId);

  res.send(tripList);
});

// GET /trips/id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const trip = trips.find(trip => trip.tripId === +id);

  if (trip.userId !== req.userId) res.status(401);

  res.send(trip);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;

  trips = trips.map(trip => (trip.tripId === +id ? { ...trip, ...req.body } : trip));
  const trip = trips.find(trip => trip.tripId === +id);

  res.send(trip);
});

// POST /trips
router.post('/', (req, res) => {
  const { country, title, budget, currency, startDate, endDate } = req.body;
  const { userId } = req;
  const newTrip = {
    tripId: generateId(),
    userId,
    country,
    title,
    budget,
    cashTotal: 0,
    cardTotal: 0,
    currency,
    startDate,
    endDate,
  };

  trips = [...trips, newTrip];

  res.send(newTrip);
});

module.exports = router;
