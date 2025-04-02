// routes/gameRoutes.js

const express = require('express');
const db = require('../config/db');  // DB 연결 가져오기

const router = express.Router();

// 게임 데이터 저장 API
router.post('/savegamedata', (req, res) => {
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

module.exports = router;
