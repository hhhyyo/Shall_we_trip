import axios from 'axios';
import flatpickr from 'flatpickr';
import store from '../store/trips';
import country from '../store/country';
import { getInputName, isValid, isSubmit, resetFormData } from '../store/tripForm';

const $addTrip = document.querySelector('.add-trip');
const $modalBg = document.querySelector('.modal-bg');
const $buttonCloseModal = document.querySelector('.button-close-modal');
const $tripInfoForm = document.getElementById('tripInfoForm');
const $countryInput = document.getElementById('countryInput');
const $budgetInput = document.getElementById('budgetInput');
const $inputWrapGuide = document.querySelector('.input-wrap__guide');
const $buttonSubmit = document.querySelector('.button--submit');

let budgetExchange = null;
let budgetOk = false;

const $periodInput = document.getElementById('periodInput');

const datePicker = flatpickr($periodInput, {
  mode: 'range',
  dateFormat: 'Y.m.d',
  minDate: 'today',
  locale: {
    weekdays: {
      shorthand: ['일', '월', '화', '수', '목', '금', '토'],
      longhand: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    },

    months: {
      shorthand: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      longhand: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    },

    ordinal: () => '일',

    rangeSeparator: ' ~ ',
  },
});

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

  if (e.target.name === 'budget') {
    console.log(budgetOk);
    if (budgetOk) inputName.validate = true;
    inputName.validate = false;
  }

  $buttonSubmit.disabled = !isSubmit(allInputOfForm);
};

document.addEventListener('DOMContentLoaded', () => {
  store.fetchTrips();
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 300);
});

$addTrip.addEventListener('click', () => {
  document.body.classList.add('overflow-hidden');
  $modalBg.classList.add('active');
  $modalBg.classList.remove('notransition');
});

$buttonCloseModal.addEventListener('click', () => {
  document.body.classList.remove('overflow-hidden');
  $modalBg.classList.remove('active');
  $tripInfoForm.reset();
  datePicker.clear();
  const allInputOfForm = $tripInfoForm.querySelectorAll('input');
  resetFormData(allInputOfForm);

  allInputOfForm.forEach($el => {
    const $inputError = $el.closest('.input-wrap').lastElementChild;

    $inputError.classList.remove('active');
  });

  $inputWrapGuide.innerHTML = '현재 환율로 약 <b class="basic"></b> 입니다.';
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

  $budgetInput.value = '';
  $inputWrapGuide.innerHTML = '현재 환율로 약 <b class="basic"></b> 입니다.';
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
    budgetOk = true;
    $inputWrapGuide.innerHTML = `현재 환율로 약 <b>${exchangeMoney}${country[countryInput][1]}</b> 입니다.`;
    $buttonSubmit.disabled = false;
  } catch (error) {
    console.log(error);
  }
};

$budgetInput.addEventListener('focusout', () => {
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
});

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
