import './sign-forms';
import axios from 'axios';

const $signInForm = document.querySelector('.sign-in form');

const request = async e => {
  e.preventDefault();
  try {
    const { data } = await axios.post('/api/users/auth', {
      email: e.target.email.value,
      password: e.target.password.value,
    });
    sessionStorage.setItem('userId', data.userId);
    console.log(data);
  } catch (e) {
    alert('일치하는 사용자 정보가 없습니다.');
  }
};

$signInForm.onsubmit = request;
