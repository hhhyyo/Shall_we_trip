import { fetchTripInfo, setExpensesFilter } from '../store/expense';

const $category = document.querySelector('.category');

document.addEventListener('DOMContentLoaded', fetchTripInfo);

$category.onclick = ({ target }) => {
  if (!target.classList.contains('category__button')) return;

  [...document.querySelectorAll('.category__button')].forEach($el => {
    $el.classList.toggle('category__button--selected', $el === target);
  });

  setExpensesFilter(target.dataset.category);
};
