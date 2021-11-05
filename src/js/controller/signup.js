import './sign-forms';
import axios from 'axios';

// 중복 체크 버튼 상태 변수
let emailCheckState = false;

const $signUpForm = document.querySelector('.sign-up form');

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 300);
});

const request = async e => {
  try {
    await axios.post('/api/users', {
      userName: e.target.userName.value,
      phoneNumber: e.target.phoneNumber.value,
      nickname: e.target.nickname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    });

    window.location.href = '/signin';
  } catch (e) {
    console.error(e);
  }
};

const emailDoubleCheck = async () => {
  const $email = document.querySelector('#userEmail');
  const $errorMessage = $email.closest('.input-wrap').lastElementChild;

  try {
    const { data: users } = await axios.get('/api/users');
    emailCheckState = [...users].every(user => user.email !== $email.value);

    $errorMessage.classList.add('active');
    $errorMessage.classList.toggle('correct', emailCheckState);
    $errorMessage.textContent = emailCheckState ? '사용 할 수 있는 아이디입니다.' : '사용 할 수 없는 아이디입니다.';
  } catch (e) {
    console.error(e);
  }
};

document.querySelector('.input__box--check').onclick = emailDoubleCheck;
document.querySelector('#userEmail').oninput = () => {
  emailCheckState = false;
};
$signUpForm.onsubmit = e => {
  e.preventDefault();

  if (!emailCheckState) {
    alert('이메일 중복체크 해주세요.');
    document.querySelector('#userEmail').focus();
    return;
  }

  request(e);
};
