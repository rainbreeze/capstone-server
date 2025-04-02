// routes/registerRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');  // DB 연결 가져오기

const router = express.Router();

// 회원가입 API
router.post('/', (req, res) => {
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

module.exports = router;
