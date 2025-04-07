// models/playlistModel.js
const db = require('../config/db');  // DB 연결 설정 파일

// 새로운 playlist 생성 함수
const createPlaylist = (userId, genre) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO playlists (user_id, name) VALUES (?, ?)';

        db.query(query, [userId, genre], (err, result) => {
            if (err) {
                console.error('Playlist 생성 실패:', err);
                return reject(err);  // 에러 발생 시 reject
            }
            resolve(result);  // 성공 시 resolve
        });
    });
};

module.exports = {
    createPlaylist,
};
