const pool = require('../config/db');
const bcrypt = require('bcryptjs'); // bcryptjs를 import 합니다.

const getUserById = (userId, callback) => {
    const sql = 'SELECT * FROM users WHERE userId = ?';
    pool.query(sql, [userId], callback);
};

const comparePassword = (inputPassword, hashedPassword, callback) => {
    bcrypt.compare(inputPassword, hashedPassword, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

// 이 아래에 카카오 로그인 관련 함수를 추가합니다.

const getKakaoUserById = (kakaoId, callback) => {
    const sql = 'SELECT * FROM users WHERE provider = "kakao" AND userId = ?';
    pool.query(sql, [`kakao_${kakaoId}`], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results.length > 0 ? results[0] : null);
    });
};

const registerKakaoUser = (user, callback) => {
    const { userId, userName, profileImage, provider } = user;
    const sql = 'INSERT INTO users (userId, userName, profileImage, provider) VALUES (?, ?, ?, ?)';
    pool.query(sql, [userId, userName, profileImage, provider], callback);
};

module.exports = {
    getUserById,
    comparePassword,
    getKakaoUserById,
    registerKakaoUser,
};