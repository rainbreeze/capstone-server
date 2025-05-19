// models/mypageModel.js

const db = require('../config/db'); // 예시: MySQL 연결 모듈

const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT username, userId, email, createdAt FROM users WHERE id = ?';
        db.query(query, [userId], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

module.exports = { getUserById };
