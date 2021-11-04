import axios from 'axios';
import { renderTrip, renderExpenses } from '../view/expense';
import { searchParam } from '../utils/helper';

const state = {
  trip: {
    tripId: 0,
    country: '',
    title: '',
    budget: 0,
    cashTotal: 0,
    cardTotal: 0,
    currency: '',
    startDate: '',
    endDate: '',
  },
  expenses: {
    filter: '',
    list: [],
  },
};

const setTrip = newTrip => {
  state.trip = newTrip;

  renderTrip(state.trip);
};

const setExpenses = newExpenses => {
  state.expenses.list = newExpenses;

  renderExpenses(state.expenses.list, state.trip.currency);
};

const fetchExpenses = async () => {
  try {
    const { data } = await axios.get(`/api/expenses`, {
      params: {
        category: state.expenses.filter,
        tripId: state.trip.tripId,
      },
    });

    setExpenses(data);
  } catch (error) {
    console.error();
  }
};

const setExpensesFilter = newFilter => {
  state.expenses.filter = newFilter;

  fetchExpenses();
};

const fetchTripInfo = async () => {
  try {
    const tripId = searchParam();
    const { data } = await axios.get(`/api/trips/${tripId}`);

    setTrip(data[0]);
    fetchExpenses();
  } catch (error) {
    console.error();
  }
};

export { fetchTripInfo, setExpensesFilter };
