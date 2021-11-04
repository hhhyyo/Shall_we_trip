import axios from 'axios';
import country from '../store/country';

const beforeCountry = document.querySelector('.exchange__section--before--countryinput');
const beforeMoney = document.querySelector('.exchange__section--before--moneyinput');
const exchangeBeforeUnit = document.querySelector('.exchange__section--before--unit');
const afterMoney = document.querySelector('.exchange__section--after--moneyinput');
const hotplaceWrap = document.querySelectorAll('.exchange__hotplace--detail--wrap');

// 원화(10.4원) -> 외화(1엔)
const invertExchangeRender = async (money, inCountry) => {
  const apiURL = `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${country[inCountry][0]}`;
  try {
    const response = await axios.get(apiURL);
    let exchangeMoney = 0;
    if (inCountry === '일본' || inCountry === '베트남' || inCountry === '인도네시아') {
      exchangeMoney = ((money / response.data[0].basePrice) * 100).toFixed(2);
    } else {
      exchangeMoney = (money / response.data[0].basePrice).toFixed(2);
    }
    return exchangeMoney;
  } catch (error) {
    console.log(error);
  }
};

// 외화(1엔) -> 원화(10.4원)
const forwardExchangeRender = async (money, inCountry) => {
  const apiURL = `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${country[inCountry][0]}`;
  try {
    const response = await axios.get(apiURL);
    let exchangeMoney = 0;
    if (inCountry === '일본' || inCountry === '베트남' || inCountry === '인도네시아') {
      exchangeMoney = ((money * response.data[0].basePrice) / 100).toFixed(2);
    } else {
      exchangeMoney = (money * response.data[0].basePrice).toFixed(2);
    }
    return exchangeMoney;
  } catch (error) {
    console.log(error);
  }
};

const exchangeRender = async () => {
  const apiURL = `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${country[beforeCountry.value][0]}`;
  try {
    const response = await axios.get(apiURL);
    if (beforeCountry.value === '일본' || beforeCountry.value === '베트남' || beforeCountry.value === '인도네시아') {
      afterMoney.value = ((beforeMoney.value * response.data[0].basePrice) / 100).toFixed(2);
    } else {
      afterMoney.value = (beforeMoney.value * response.data[0].basePrice).toFixed(2);
    }
    exchangeBeforeUnit.textContent = country[beforeCountry.value][1];
  } catch (error) {
    console.log(error);
  }
};

const hotplaceRender = () => {
  [...hotplaceWrap].forEach(async el => {
    const hotplaceCountry = el.querySelector('.exchange__hotplace--detail--country');
    const hotplaceMoney = el.querySelector('.exchange__hotplace--detail--money');
    const hotplaceRatio = el.querySelector('.exchange__hotplace--detail--ratio');

    const apiURL = `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${
      country[hotplaceCountry.innerText][0]
    }`;

    try {
      const response = await axios.get(apiURL);
      if (
        hotplaceCountry.textContent === '일본' ||
        hotplaceCountry.textContent === '베트남' ||
        hotplaceCountry.textContent === '인도네시아'
      ) {
        hotplaceMoney.textContent = ((beforeMoney.value * response.data[0].basePrice) / 100).toFixed(2);
      } else {
        hotplaceMoney.textContent = (beforeMoney.value * response.data[0].basePrice).toFixed(2);
      }
      const option = response.data[0].signedChangeRate > 0 ? '+' : '';

      response.data[0].signedChangeRate > 0
        ? hotplaceRatio.classList.toggle('exchange__ratio--red')
        : response.data[0].signedChangeRate < 0
        ? hotplaceRatio.classList.toggle('exchange__ratio--blue')
        : hotplaceRatio.classList.toggle('exchange__ratio--gray');

      hotplaceRatio.textContent = option + (response.data[0].signedChangeRate * 100).toFixed(2) + '%';
    } catch (error) {
      console.log(error);
    }
  });
};

export { beforeCountry, beforeMoney, invertExchangeRender, forwardExchangeRender, exchangeRender, hotplaceRender };
