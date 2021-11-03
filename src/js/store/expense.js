import axios from 'axios';
import { renderTrip } from '../view/expense';

const state = {
  trip: {
    tripId: 0,
    country: '',
    title: '',
    budget: 0,
    cashTotal: 0,
    cardTotal: 0,
    startDate: '',
    endDate: '',
  },
};

const setTrip = newTrip => {
  state.trip = newTrip;

  renderTrip(state.trip);
};

const fetch = async () => {
  try {
    // tripId를 받아왔다고 가정
    const tripId = 2;
    const { data } = await axios.get(`/api/trips/${tripId}`);
    setTrip(data);
  } catch (error) {
    console.error();
  }
};

export { fetch };
