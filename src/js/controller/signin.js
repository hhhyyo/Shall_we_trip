import './sign-forms';
import axios from 'axios';

const $signInForm = document.querySelector('.sign-in form');

$signInForm.onsubmit = async e => {
  e.preventDefault();
  try {
    const { data } = await axios.post('/api/users/auth', {
      email: e.target.email.value,
      password: e.target.password.value,
    });
    data.loginSuccess ? (window.location.href = '/') : (window.location.href = '/signup');
    // console.log(data.loginSuccess)
  } catch (e) {
    console.error(e);
  }
};
