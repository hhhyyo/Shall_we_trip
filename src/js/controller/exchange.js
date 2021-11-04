import {
  country,
  beforeCountry,
  beforeMoney,
  invertExchangeRender,
  exchangeRender,
  hotplaceRender,
} from '../view/exchange';

const exchangeSection = document.querySelector('.exchange__section');

// DOMContentLoaded됬을 때 각 나라의 api를 호출해서 뿌려주기.
window.addEventListener('DOMContentLoaded', () => {
  exchangeRender();
  hotplaceRender();

  invertExchangeRender(50000, '미국');
});

exchangeSection.addEventListener('change', () => {
  // 없는 국가이거나 돈이 비어있다면 return
  if (!Object.keys(country).includes(beforeCountry.value) && beforeMoney) return;
  // 국가도 써있고 돈도 입력했다면 렌더
  exchangeRender();
});
