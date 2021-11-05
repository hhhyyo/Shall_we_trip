import country from '../store/country';
import { beforeCountry, beforeMoney, exchangeRender, hotplaceRender } from '../view/exchange';

const exchangeSection = document.querySelector('.exchange__section');

// DOMContentLoaded됬을 때 각 나라의 api를 호출해서 뿌려주기.
window.addEventListener('DOMContentLoaded', async () => {
  exchangeRender();
  hotplaceRender();

  // console.log(await invertExchangeRender(10.4, '일본'));
  // console.log(await forwardExchangeRender(1, '일본'));
});

exchangeSection.addEventListener('change', () => {
  if (!Object.keys(country).includes(beforeCountry.value) && beforeMoney) return;
  exchangeRender();
});
