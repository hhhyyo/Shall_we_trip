const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const router = express.Router();
router.use(cookieParser());

// Mock data
let users = [
  {
    userId: 1,
    userName: 'test1',
    phoneNumber: '01038583732',
    nickname: 'hihi',
    email: 'barum89@naver.com',
    password: '123456789',
  },
  {
    userId: 2,
    userName: 'test2',
    phoneNumber: '01038583732',
    nickname: 'hello',
    email: 'barum89@daum.com',
    password: '987654321',
  },
  {
    userId: 3,
    userName: 'test3',
    phoneNumber: '01038583732',
    nickname: 'bye',
    email: 'barum89@google.com',
    password: '741852963',
  },
];

const generateId = () => Math.max(...users.map(user => user.userId), 0) + 1;

router.get('/', (req, res) => {
  res.send(users);
});

// POST /api/users
router.post('/', (req, res) => {
  const { userName, phoneNumber, nickname, email, password } = req.body;
  const newUser = { userId: generateId(), userName, phoneNumber, nickname, email, password };
  users = [...users, newUser];

  const result = { message: 'user created' };

  res.send(result);
});

// POST /api/users/auth
router.post('/auth', (req, res) => {
  const { email, password } = req.body;
  const user = [...users].find(user => user.email === email && user.password === password);

  if (!user) return res.status(401).send({ error: '입력하신 정보가 올바르지 않습니다.' });
  const { userId } = user;

  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });

  // 쿠키에 토큰 설정(http://expressjs.com/ko/api.html#res.cookie)
  res.cookie('accessToken', accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
    httpOnly: true,
  });

  // 로그인 성공
  res.send({ email, userId });
});

module.exports = router;
