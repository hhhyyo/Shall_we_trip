import country from '../store/country';
import { beforeCountry, beforeMoney, exchangeRender, hotplaceRender } from '../view/exchange';
import suggestions from '../view/suggestion';

const exchangeSection = document.querySelector('.exchange__section');

// 자동완성
const searchWrapper = document.querySelector('.exchange__section--before');
const suggBox = document.querySelector('.exchange__input--autocom-box');

// DOMContentLoaded됬을 때 각 나라의 api를 호출해서 뿌려주기.
window.addEventListener('DOMContentLoaded', () => {
  exchangeRender();
  hotplaceRender();

  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 300);
  // console.log(await invertExchangeRender(10.4, '일본'));
  // console.log(await forwardExchangeRender(1, '일본'));
});

exchangeSection.addEventListener('change', () => {
  if (!Object.keys(country).includes(beforeCountry.value) && beforeMoney) return;
  console.log('test');
  exchangeRender();
});

beforeCountry.addEventListener('keyup', e => {
  const userData = e.target.value;
  let emptyArr = [];

  if (userData) {
    emptyArr = suggestions.filter(data => data.match(userData));
    emptyArr = emptyArr.map(data => `<li>${data}</li>`);
    searchWrapper.classList.add('active');
    // showSuggestions(emptyArr);
    suggBox.innerHTML = emptyArr.join('');
    [...suggBox.querySelectorAll('li')].forEach(el => {
      el.addEventListener('click', e => {
        if (!el === e.target) return;
        console.log(e.target.textContent);
        beforeCountry.value = e.target.textContent;
        searchWrapper.classList.remove('active');
        exchangeRender();
      });
    });
  } else {
    searchWrapper.classList.remove('active');
  }
  console.log(emptyArr);
  if (e.key === 'Enter') searchWrapper.classList.remove('active');
});
