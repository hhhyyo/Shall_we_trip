import { fetchTripInfo, setExpensesFilter, getCurreny, getCountry, addExpense } from '../store/expense';
import { getNow } from '../utils/helper';
import { forwardExchangeRender } from '../view/exchange';

const $body = document.querySelector('body');
const $commonMenu = document.querySelector('.commonMenu');
const $addExpense = document.querySelector('.add-expense');
const $category = document.querySelector('.category');
const $modalBg = document.querySelector('.modal-bg');
const $buttonCloseModal = document.querySelector('.button-close-modal');
const $modalForm = document.querySelector('.modal__form');
const $meal = document.getElementById('meal');
const $cash = document.getElementById('cash');
const $title = document.getElementById('title');
const $date = document.getElementById('date');
const $cost = document.getElementById('cost');
const $inputMoneyUnit = document.querySelector('.input-money__unit');
const $inputWrapGuide = document.querySelector('.input-wrap__guide');

document.addEventListener('DOMContentLoaded', fetchTripInfo);

$addExpense.onclick = () => {
  $commonMenu.classList.add('a11y-hidden');
  $modalBg.classList.add('active');
  $body.classList.add('overflow-hidden');
  $date.value = getNow();
  $inputMoneyUnit.textContent = getCurreny();
  document.querySelector('.top-label').scrollIntoView();
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
  $body.classList.remove('overflow-hidden');

  $meal.checked = true;
  $cash.checked = true;
  $title.value = '';
  $cost.value = '';
  $inputWrapGuide.innerHTML = '';
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
  $category.scrollIntoView();
};

$cost.oninput = async e => {
  try {
    $cost.value = $cost.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    const country = getCountry();
    const exchangedCost = await forwardExchangeRender(+e.target.value, country);

    $inputWrapGuide.innerHTML = `현재 환율로 약 <b>${exchangedCost}원</b> 입니다.`;
  } catch (error) {
    console.error(error);
  }
};
