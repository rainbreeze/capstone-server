// models/playlistModel.js
const db = require('../config/db');  // DB 연결 설정 파일

const getFullPlaylistData = (userId, callback) => {
    const query = `
        SELECT 
            playlists.playlist_id, 
            playlists.created_at, 
            playlist_music.playlist_music_id,
            playlist_music.music_id,
            playlist_music.album_image_url,
            playlist_music.track_name,
            playlist_music.genre,
            playlist_music.artist_names,
            playlist_music.spotify_url
        FROM playlists
        LEFT JOIN playlist_music ON playlists.playlist_id = playlist_music.playlist_id
        WHERE playlists.user_id = ?
        ORDER BY playlists.created_at DESC;
    `;
    db.execute(query, [userId], callback);
};

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

// 플레이리스트 ID 조회
const getPlaylistIdsByUserId = (userId, callback) => {
    const query = 'SELECT playlist_id, created_at FROM playlists WHERE user_id = ?';
    db.execute(query, [userId], callback);
};

// 플레이리스트 Time 조회
const getCreationTimeByPlaylistId = (playlistId, callback) => {
    const query = 'SELECT created_at FROM playlists WHERE playlist_id = ?';
    db.execute(query, [playlistId], callback);
};

// 플레이리스트에 해당하는 음악 ID 조회
const getPlaylistMusicIdsByPlaylistId = (playlistId, callback) => {
    const query = 'SELECT playlist_music_id FROM playlist_music WHERE playlist_id = ?';
    db.execute(query, [playlistId], callback);
};

const deletePlaylistMusicByPlaylistId = (playlistId, callback) => {
    const query = 'DELETE FROM playlist_music WHERE playlist_id = ?';
    db.execute(query, [playlistId], callback);
}
const deletePlaylistById = (playlistId, callback) => {
    const query = 'DELETE FROM playlists WHERE playlist_id = ?';
    db.execute(query, [playlistId], callback);
}

module.exports = {
    createPlaylist,
    getPlaylistIdsByUserId,
    getPlaylistMusicIdsByPlaylistId,
    getCreationTimeByPlaylistId,
    deletePlaylistById,
    deletePlaylistMusicByPlaylistId,
    getFullPlaylistData
};
