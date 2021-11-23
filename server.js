const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const auth = require('./middleware/auth');

// express는 함수
const app = express();
const PORT = 3000;

// 루트 디렉토리 설정
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, './public/signin.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, './public/signup.html'));
});

app.get('/trip-list', auth, (req, res) => {
  res.sendFile(path.join(__dirname, './public/trip-list.html'));
});

app.get('/trip-expense', auth, (req, res) => {
  res.sendFile(path.join(__dirname, './public/trip-expense.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
