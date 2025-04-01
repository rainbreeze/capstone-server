const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

// JWT 비밀키
const JWT_SECRET = 'your_jwt_secret_key';

// 회원가입 API
app.post('/register', (req, res) => {
    const { userId, email, password } = req.body;

    // 비밀번호 해싱
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('비밀번호 해싱 실패:', err);
            return res.status(500).json({ error: '비밀번호 해싱 실패' });
        }

        // SQL 쿼리 (회원가입)
        const query = 'INSERT INTO users (userId, email, password) VALUES (?, ?, ?)';
        
        db.query(query, [userId, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('회원가입 실패:', err);
                return res.status(500).json({ error: '회원가입 실패' });
            }
            res.status(200).json({ message: '회원가입 성공!' });
        });
    });
});

// 로그인 API
app.post('/login', (req, res) => {
    const { userId, password } = req.body;

    // SQL 쿼리 (사용자 정보 조회)
    const query = 'SELECT * FROM users WHERE userId = ?';
    
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('로그인 실패:', err);
            return res.status(500).json({ error: '로그인 실패' });
        }

        // 사용자 존재하지 않음
        if (result.length === 0) {
            return res.status(401).json({ error: '아이디 또는 비밀번호가 잘못되었습니다.' });
        }

        const user = result[0];

        // 비밀번호 비교
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('비밀번호 비교 실패:', err);
                return res.status(500).json({ error: '로그인 실패' });
            }

            // 비밀번호 일치하지 않음
            if (!isMatch) {
                return res.status(401).json({ error: '아이디 또는 비밀번호가 잘못되었습니다.' });
            }

            // JWT 토큰 생성
            const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: '로그인 성공!', token });
        });
    });
});

// 게임 데이터 저장 API
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
