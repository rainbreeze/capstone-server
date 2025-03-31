const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
    host: 'maglev.proxy.rlwy.net',
    user: 'root',
    password: 'XKgncJXdXqGqAwJTOaPBAuSLxpZRYGqG',
    database: 'railway',
    port: 30153
});

// 데이터베이스 연결
db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
        return;
    }
    console.log('MySQL 데이터베이스에 연결되었습니다.');
});

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// POST 요청을 통해 데이터를 저장하는 엔드포인트
app.post('/saveGameData', (req, res) => {
    const { userId, score, genre, year, artist, hipster } = req.body;

    // SQL 쿼리
    const query = 'INSERT INTO game_data (userId, score, genre, year, artist, hipster) VALUES (?, ?, ?, ?, ?, ?)';
    
    // 데이터베이스에 데이터 삽입
    db.query(query, [userId, score, genre, year, artist, hipster], (err, result) => {
        if (err) {
            console.error('데이터 저장 실패:', err);
            return res.status(500).json({ error: '데이터 저장 실패' });
        }
        res.status(200).json({ message: '데이터가 성공적으로 저장되었습니다!' });
    });
});

// 서버 실행
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
