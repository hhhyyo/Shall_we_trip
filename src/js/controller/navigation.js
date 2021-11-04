import axios from 'axios';

const logout = async () => {
  try {
    await axios.post('/api/users/signout', {});
    window.location.href = '/';
  } catch (e) {
    console.log(e);
  }
};

document.querySelector('.commonMenu__setting').onclick = e => {
  if (!e.target.closest('.commonMenu__setting')) return;
  document.querySelector('.commonMenu__setwrap').classList.toggle('opacityChange');
};

document.querySelector('.commonMenu').onclick = e => {
  if (!e.target.classList.contains('commonMenu__logout')) return;
  e.preventDefault();
  logout();
};

document.querySelector('.unimplemented').onclick = e => {
  e.preventDefault();
  alert('페이지 준비중입니다.');
};
