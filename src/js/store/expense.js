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
    console.error(error);
  }
};

const setExpensesFilter = newFilter => {
  state.expenses.filter = newFilter;

  fetchExpenses();
};

const fetchTripInfo = async () => {
  try {
    const tripId = searchParam();

    const [trip, expenses] = await Promise.all([
      axios.get(`/api/trips/${tripId}`),
      axios.get(`/api/expenses`, {
        params: {
          category: state.expenses.filter,
          tripId,
        },
      }),
    ]);

    setTrip(trip.data);
    setExpenses(expenses.data);
  } catch (error) {
    window.alert('접근 권한이 없는 페이지입니다.');
    window.location.href = '/';
  }
};

const getCurreny = () => state.trip.currency;

const getCountry = () => state.trip.country;

const addExpense = async newExpense => {
  try {
    const expense =
      newExpense.paymentMethod === '현금'
        ? { cashTotal: +newExpense.cost + state.trip.cashTotal }
        : { cardTotal: +newExpense.cost + state.trip.cardTotal };

    const [expenses, trip] = await Promise.all([
      axios.post(`/api/expenses`, {
        tripId: state.trip.tripId,
        ...newExpense,
      }),
      axios.patch(`/api/trips/${state.trip.tripId}`, expense),
    ]);

    setExpenses(expenses.data);
    setTrip(trip.data);
  } catch (error) {
    console.error(error);
  }
};

export { setExpensesFilter, fetchTripInfo, getCurreny, addExpense, getCountry };
