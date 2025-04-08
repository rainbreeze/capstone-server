// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');  // config/db.js에서 연결한 데이터베이스를 가져옴

// 필요한 라우터 불러오기
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const gameRoutes = require('./routes/gameRoutes');  // 게임 데이터 관련 라우터 추가

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 유저 ID로 플레이리스트 ID를 조회하는 API
app.get('/playlist/:userId', (req, res) => {
    const userId = req.params.userId;

    // 플레이리스트 ID 조회 쿼리
    const query = 'SELECT playlist_id FROM playlists WHERE user_id = ?';

    // MySQL 쿼리 실행
    db.execute(query, [userId], (err, results) => {
        if (err) {
            console.error('쿼리 실행 중 오류 발생:', err);
            return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: '플레이리스트가 없습니다.', playlistIds: [] });
        }

        // 플레이리스트 ID만 배열로 반환
        const playlistIds = results.map(row => row.playlist_id);
        res.json({ playlistIds });
    });
});

// 플레이리스트 ID로 관련된 music ID만 가져오는 API
app.get('/playlist/music/:playlistId', (req, res) => {
    const playlistId = req.params.playlistId;  // URL에서 playlistId 파라미터 가져오기

    // 플레이리스트에 해당하는 music ID만 조회하는 쿼리
    const query = `
        SELECT playlist_music_id 
        FROM playlist_music 
        WHERE playlist_id = ?`;

    // MySQL 쿼리 실행
    db.execute(query, [playlistId], (err, results) => {
        if (err) {
            console.error('쿼리 실행 중 오류 발생:', err);
            return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: '해당 플레이리스트에 음악이 없습니다.', playlist_music_ids: [] });
        }

        // playlist_music_id만 반환
        const playlistMusicIds = results.map(row => row.playlist_music_id);
        res.json({ playlist_music_ids: playlistMusicIds });
    });
});

// music_id로 음악의 이미지 URL만 가져오는 API
app.get('/music/image/:musicId', (req, res) => {
    const musicId = req.params.musicId;  // URL에서 musicId 파라미터 가져오기

    // 음악 이미지 URL을 조회하는 쿼리
    const query = `
        SELECT album_image_url
        FROM playlist_music 
        WHERE playlist_music_id = ?`;

    // MySQL 쿼리 실행
    db.execute(query, [musicId], (err, results) => {
        if (err) {
            console.error('쿼리 실행 중 오류 발생:', err);
            return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: '해당 음악을 찾을 수 없습니다.' });
        }

        // 음악 이미지 URL만 반환
        res.json({ album_image_url: results[0].album_image_url });
    });
});

// 라우터 사용
app.use('/register', registerRoutes);  // '/register' 경로로 들어오는 요청을 registerRoutes로 처리
app.use('/login', loginRoutes);  // '/login' 경로로 들어오는 요청을 loginRoutes로 처리
app.use('/game', gameRoutes);  // '/game' 경로로 들어오는 요청을 gameRoutes로 처리

// 서버 실행
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
