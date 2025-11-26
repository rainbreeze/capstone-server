const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');  // ⬅️ 이미지 정적 경로를 위해 필요
const db = require('./config/db');

// 필요한 라우터 불러오기
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const gameRoutes = require('./routes/gameRoutes');
const gameStatRoutes = require('./routes/gameStatRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const playlistMusicRoutes = require('./routes/playlistMusicRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const commentRoutes = require('./routes/commentRoutes');
const replyRoutes = require('./routes/replyRoutes');
const mypageRoutes = require('./routes/mypageRoutes');
const genreApiRoutes = require('./routes/genreApiRoutes');

const app = express();

app.options('*', cors());

// ✅ 정적 폴더 설정 - 업로드한 이미지 접근 허용
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 클라이언트 정적 파일 제공
// React 프로젝트의 빌드 파일을 제공하기 위한 설정입니다.
app.use(express.static(path.join(__dirname, '..', 'capstone-client', 'build')));

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 라우터 사용
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/game', gameRoutes);
app.use('/saveStat', gameStatRoutes);
app.use('/playlist', playlistRoutes);
app.use('/playlistmusic', playlistMusicRoutes);
app.use('/reviews', reviewRoutes);
app.use('/comment', commentRoutes);
app.use('/reply', replyRoutes);
app.use('/api', mypageRoutes);
app.use('/genreapi', genreApiRoutes);

// 클라이언트 라우팅 처리: 위에 정의된 API 라우트 외의 모든 GET 요청에 대해
// React 애플리케이션의 진입점인 index.html 파일을 반환합니다.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'capstone-client', 'build', 'index.html'));
});

// 서버 실행
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});