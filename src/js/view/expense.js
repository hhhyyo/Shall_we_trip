import { parsePeriod } from '../utils/helper';

const $tripTitle = document.querySelector('.trip__title');
const $tripPeriod = document.querySelector('.trip__period');
const $budgetTotalCost = document.querySelector('.budget__total-cost');
const $budgetRestCost = document.querySelector('.budget__rest-cost');
const $expenseTotalCost = document.querySelector('.expense__total-cost');
const $expenseCashCost = document.querySelector('.expense__cash-cost');
const $expenseCardCost = document.querySelector('.expense__card-cost');

const renderTrip = ({ title, budget, cashTotal, cardTotal, currency, startDate, endDate }) => {
  const totalCost = cashTotal + cardTotal;

  $tripTitle.textContent = title;
  $tripPeriod.textContent = parsePeriod(startDate, endDate);
  $budgetTotalCost.textContent = `${budget} ${currency}`;
  $budgetRestCost.textContent = `${budget - totalCost} ${currency}`;
  $expenseTotalCost.textContent = `${totalCost} ${currency}`;
  $expenseCashCost.textContent = `${cashTotal} ${currency}`;
  $expenseCardCost.textContent = `${cardTotal} ${currency}`;
};

export { renderTrip };
