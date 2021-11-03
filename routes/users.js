const express = require('express');

const router = express.Router();

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
  const valid = [...users].filter(user => user.email === email && user.password === password).length;

  valid ? res.send({ loginSuccess: true }) : res.send({ loginSuccess: false });
});

module.exports = router;
