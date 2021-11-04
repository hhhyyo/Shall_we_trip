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

const renderExpenses = (expenses, currency) => {
  document.querySelector('.expense__list').innerHTML = expenses
    .map(
      ({ title, category, paymentMethod, cost, date }) =>
        `<li class="area">
        <a href="#" role="button" class="expense__item ${category}">
          <div class="expense__info">
            <h3 class="expense__title">${title}</h3>
            <span class="expense__date">${date}</span>
          </div>
          <div class="expense__detail">
            <b class="expense__cost">-${cost} ${currency}</b>
            <span class="expense__payment-method">${paymentMethod}</span>
          </div>
        </a>
      </li>`
    )
    .join('');
};

export { renderTrip, renderExpenses };
