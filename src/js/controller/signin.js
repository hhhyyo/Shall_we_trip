import axios from 'axios';
import './sign-forms';
import { getInputName } from '../store/sign';

const $signInForm = document.querySelector('.sign-in form');

const request = async e => {
  e.preventDefault();
  try {
    await axios.post('/api/users/auth', {
      email: e.target.email.value,
      password: e.target.password.value,
    });
    window.location.href = '/';
  } catch (e) {
    alert('입력하신 정보가 올바르지 않습니다.');

    $signInForm.email.focus();
    $signInForm.email.value = '';
    $signInForm.password.value = '';
    getInputName($signInForm.email.name).validate = false;
    getInputName($signInForm.password.name).validate = false;
    document.querySelector('.button--submit').disabled = true;
  }
};

$signInForm.onsubmit = request;
