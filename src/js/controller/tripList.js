import axios from 'axios';
import store from '../store/trips';
import country from '../store/country';
import { getInputName, isValid, isSubmit } from '../store/tripForm';

const $addTrip = document.querySelector('.add-trip');
const $modalBg = document.querySelector('.modal-bg');
const $buttonCloseModal = document.querySelector('.button-close-modal');
const $tripInfoForm = document.getElementById('tripInfoForm');
const $countryInput = document.getElementById('countryInput');
const $budgetInput = document.getElementById('budgetInput');
const $inputWrapGuide = document.querySelector('.input-wrap__guide');
const $buttonSubmit = document.querySelector('.button--submit');

let budgetExchange = null;

const debounce = (callback, delay) => {
  let timerId;
  return event => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};

const validationCheck = e => {
  const inputName = getInputName(e.target.name);
  const $inputError = e.target.closest('.input-wrap').lastElementChild;
  const allInputOfForm = $tripInfoForm.querySelectorAll('input');

  inputName.validate = isValid(inputName, e.target.value);

  $inputError.classList.toggle('active', !inputName.validate);
  $inputError.textContent = inputName.validate ? '' : inputName.errorMessage;

  $buttonSubmit.disabled = !isSubmit(allInputOfForm);
};

document.addEventListener('DOMContentLoaded', store.fetchTrips);

$addTrip.addEventListener('click', () => {
  $modalBg.classList.add('active');
  $modalBg.classList.remove('notransition');
});

$buttonCloseModal.addEventListener('click', () => {
  $modalBg.classList.remove('active');
  $tripInfoForm.reset();
});

$tripInfoForm.addEventListener('submit', async e => {
  e.preventDefault();

  const {
    countryName: { value: countryName },
    title: { value: title },
    period: { value: period },
  } = e.target;

  const startDate = period.split('~')[0];
  const endDate = period.split('~').length > 1 ? period.split('~')[1] : startDate;
  const currency = country[countryName][1];

  try {
    const result = await axios.post('/api/trips', {
      country: countryName,
      title,
      budget: budgetExchange,
      currency,
      startDate: startDate.replace(/\./g, '-'),
      endDate: endDate.replace(/\./g, '-'),
    });
    console.log(result.data);
    window.location.href = '/trip-list';
  } catch (e) {
    console.error(e);
  }
});

$tripInfoForm.addEventListener('input', validationCheck);

$tripInfoForm.addEventListener('focusout', validationCheck);

$countryInput.addEventListener('input', () => {
  $countryInput.value = $countryInput.value.replace(/[^ㄱ-힣]/g, '');
});

$budgetInput.addEventListener('input', e => {
  $budgetInput.value = $budgetInput.value
    .replace(/[^0-9.]/g, '')
    .replace(/(\..*)\./g, '$1')
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
});

const getExchangeBudget = async (money, countryInput) => {
  const apiURL = `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${country[countryInput][0]}`;
  try {
    const response = await axios.get(apiURL);
    const exchangeMoney = (money / response.data[0].basePrice).toFixed(2);
    budgetExchange = exchangeMoney;
    $inputWrapGuide.innerHTML = `현재 환율로 약 <b>${exchangeMoney}${country[countryInput][1]}</b> 입니다.`;
  } catch (error) {
    console.log(error);
  }
};

$budgetInput.addEventListener(
  'input',
  debounce(() => {
    const money = $budgetInput.value.replace(/[^\d]+/g, '');
    const countryInput = $countryInput.value;

    if (countryInput && Object.prototype.hasOwnProperty.call(country, countryInput)) {
      getExchangeBudget(money, countryInput);
    } else {
      $budgetInput.value = '';
      getInputName($budgetInput.name).validate = false;
      $inputWrapGuide.innerHTML = '여행지 입력을 확인해주세요';
      $countryInput.focus();
    }
  }, 300)
);
