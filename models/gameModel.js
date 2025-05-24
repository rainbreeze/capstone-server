const db = require('../config/db');  // DB 연결

// 게임 데이터 저장 함수 (Promise 방식으로 변경)
const saveGameData = (userId, score, genre, year) => {
    return new Promise((resolve, reject) => {
        // score가 빈 값일 경우 처리 (NaN이 되지 않도록)
        const parsedScore = score ? parseInt(score, 10) : null;

        const query = 'INSERT INTO game_data (userId, score, genre, year) VALUES (?, ?, ?, ?)';
        
        db.query(query, [userId, parsedScore, genre, year], (err, result) => {
            if (err) {
                console.error('데이터 저장 실패:', err);
                return reject(err);  // 에러 발생 시 reject
            }
            resolve(result);  // 성공 시 resolve
        });
    });
};

module.exports = {
    saveGameData,
};
