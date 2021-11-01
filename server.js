const express = require('express');
const routes = require('./routes');

// express는 함수
const app = express();
const PORT = 7000;

// 루트 디렉토리 설정
app.use(express.static('public'));
app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
