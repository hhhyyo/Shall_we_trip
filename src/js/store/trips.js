import axios from 'axios';
import view from '../view/tripList';

let trips = [];

const setTrips = newTrips => {
  trips = newTrips;
  view.renderTripList(trips);
};

const fetchTrips = async () => {
  try {
    const { data } = await axios.get(`/api/trips`);
    setTrips(data);
  } catch (error) {
    console.error(error);
  }
};

export default {
  fetchTrips,
};
