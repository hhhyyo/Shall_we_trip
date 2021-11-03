import './sign-forms';
import axios from 'axios';

const $signUpForm = document.querySelector('.sign-up form');

$signUpForm.onsubmit = async e => {
  e.preventDefault();

  try {
    const { data } = await axios.post('/api/users', {
      userName: e.target.userName.value,
      phoneNumber: e.target.phoneNumber.value,
      nickname: e.target.nickname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    });

    window.location.href = '/';
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};

document.querySelector('.input__box--check').onclick = async e => {
  const targetValue = e.target.previousElementSibling.value;
  try {
    const { data: users } = await axios.get('/api/users');
    console.log([...users].some(user => user.email !== targetValue));
  } catch (e) {
    console.error(e);
  }
};
