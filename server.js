const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

require('dotenv').config();

// express는 함수
const app = express();
const PORT = 7000;

// 루트 디렉토리 설정
app.use(express.static('public'));
app.use(express.json());
app.use('/api', routes);
app.use(cookieParser());

const auth = (req, res, next) => {
  // 토큰이 리퀘스트의 Authorization 헤더를 통해 전달되면 req.headers.authorization으로 전달받고
  // 토큰이 쿠키를 통해 전달되면 req.cookies.accessToken으로 전달받는다.
  const accessToken = req.headers.authorization || req.cookies.accessToken;

  try {
    // 서명이 유효하고 옵션인 expiration, audience, issuer 등이 유효한 경우 디코딩된 페이로드를 반환한다. 그렇지 않으면 에러가 발생한다.
    // https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    console.log(`😀 사용자 인증 성공`, decoded);
    next();
  } catch (e) {
    console.error('😱 사용자 인증 실패..', e);
    // 클라이언트로부터 토큰이 전달되지 않아 accessToken이 undefined이거나 토큰이 유효하지 않으면
    return res.redirect('/signin');
  }
};

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, './public/signin.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, './public/signup.html'));
});

app.get('/trip-list', auth, (req, res) => {
  console.log();
  res.sendFile(path.join(__dirname, './public/trip-list.html'));
});

app.get('/trip-expense', auth, (req, res) => {
  res.sendFile(path.join(__dirname, './public/trip-expense.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
