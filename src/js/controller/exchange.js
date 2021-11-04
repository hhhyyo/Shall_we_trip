import { country, beforeCountry, beforeMoney, exchangeRender, hotplaceRender } from '../view/exchange';

const exchangeSection = document.querySelector('.exchange__section');

// DOMContentLoaded됬을 때 각 나라의 api를 호출해서 뿌려주기.
window.addEventListener('DOMContentLoaded', () => {
  exchangeRender();
  hotplaceRender();
});

exchangeSection.addEventListener('change', () => {
  if (!Object.keys(country).includes(beforeCountry.value) && beforeMoney) return;
  exchangeRender();
});
