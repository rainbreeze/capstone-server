// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');  // config/db.js에서 연결한 데이터베이스를 가져옴

// 필요한 라우터 불러오기
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const gameRoutes = require('./routes/gameRoutes');  // 게임 데이터 관련 라우터 추가
const playlistRoutes = require('./routes/playlistRoutes');
const playlistMusicRoutes = require('./routes/playlistMusicRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 라우터 사용
app.use('/register', registerRoutes);  // '/register' 경로로 들어오는 요청을 registerRoutes로 처리
app.use('/login', loginRoutes);  // '/login' 경로로 들어오는 요청을 loginRoutes로 처리
app.use('/game', gameRoutes);  // '/game' 경로로 들어오는 요청을 gameRoutes로 처리
app.use('/playlist', playlistRoutes);
app.use('/playlistmusic', playlistMusicRoutes);
app.use('/reviews', reviewRoutes);

// 서버 실행
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
