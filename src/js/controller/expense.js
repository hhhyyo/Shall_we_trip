import { fetchTripInfo, setExpensesFilter, getCurreny, getCountry, addExpense } from '../store/expense';
import { getNow } from '../utils/helper';
import { forwardExchangeRender } from '../view/exchange';

const $commonMenu = document.querySelector('.commonMenu');
const $addExpense = document.querySelector('.add-expense');
const $category = document.querySelector('.category');
const $modalBg = document.querySelector('.modal-bg');
const $buttonCloseModal = document.querySelector('.button-close-modal');
const $modalForm = document.querySelector('.modal__form');
const $date = document.getElementById('date');
const $cost = document.getElementById('cost');
const $inputMoneyUnit = document.querySelector('.input-money__unit');

document.addEventListener('DOMContentLoaded', fetchTripInfo);

$addExpense.onclick = () => {
  $commonMenu.classList.add('a11y-hidden');
  $modalBg.classList.add('active');
  $date.value = getNow();
  $inputMoneyUnit.textContent = getCurreny();
};

$category.onclick = ({ target }) => {
  if (!target.classList.contains('category__button')) return;

  [...document.querySelectorAll('.category__button')].forEach($el => {
    $el.classList.toggle('category__button--selected', $el === target);
  });

  setExpensesFilter(target.dataset.category);
};

const resetForm = () => {
  $commonMenu.classList.remove('a11y-hidden');
  $modalBg.classList.remove('active');
};

$buttonCloseModal.onclick = resetForm;

$modalForm.onsubmit = e => {
  e.preventDefault();

  const expense = {
    title: e.target.title.value,
    category: e.target.category.value,
    paymentMethod: e.target.paymentMethod.value,
    cost: e.target.cost.value,
    date: e.target.date.value,
  };

  addExpense(expense);
  resetForm();
};

$cost.onkeyup = async ({ target }) => {
  const country = getCountry();
  const cost = await forwardExchangeRender(+target.value, country);
  console.log(cost);
};
