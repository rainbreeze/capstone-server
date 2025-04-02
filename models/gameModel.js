// models/gameModel.js

const db = require('../config/db');  // DB 연결

// 게임 데이터 저장 함수
const saveGameData = (userId, score, genre, year, artist, hipster, callback) => {
    const query = 'INSERT INTO game_data (userId, score, genre, year, artist, hipster) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(query, [userId, score, genre, year, artist, hipster], (err, result) => {
        if (err) {
            console.error('데이터 저장 실패:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

module.exports = {
    saveGameData,
};
