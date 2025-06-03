// models/mypageModel.js

const db = require('../config/db'); // 예시: MySQL 연결 모듈

const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        console.log('마이페이지 모델 작동 확인.')
        const query = 'SELECT userName, userId, email, createdAt FROM users WHERE userId = ?';
        db.query(query, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

module.exports = { getUserById };