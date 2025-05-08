// models/playlistMusicModel.js
const db = require('../config/db');  // DB 연결 설정 파일

// PlaylistMusic 모델 정의
const savePlaylistMusic = async (playlist_id, music_id, track_name, artist_names, genre, album_image_url, spotify_url) => {
    try {
        // 파라미터들 로그 찍기
        console.log('playlist_id:', playlist_id);          // 플레이리스트 ID
        console.log('music_id:', music_id);                // 음악 ID
        console.log('track_name:', track_name);            // 트랙 이름
        console.log('artist_names:', artist_names);        // 아티스트 이름들
        console.log('genre:', genre);                      // 장르
        console.log('album_image_url:', album_image_url);  // 앨범 이미지 URL
        console.log('spotify_url:', spotify_url);          // Spotify URL

        const query = `
            INSERT INTO playlist_music (playlist_id, music_id, track_name, artist_names, genre, album_image_url, spotify_url)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        
        // db.execute가 배열을 반환한다고 가정하고 result를 받음
        const result = await db.execute(query, [playlist_id, music_id, track_name, artist_names, genre, album_image_url, spotify_url]);

        // db.execute가 배열이 아닌 경우도 있을 수 있으므로 직접 확인
        console.log('DB INSERT 결과:', result);

        // 예: result가 배열이라면
        // console.log(result[0]); // 필요한 정보 (affectedRows, insertId 등)을 접근

        // 결과 반환
        return result; // result는 배열일 수도 있고 객체일 수도 있음
    } catch (error) {
        console.error('Error saving playlist music:', error.message);
        throw new Error('Error saving playlist music: ' + error.message);
    }
};

// 특정 플레이리스트의 음악들을 가져오는 함수
const getPlaylistMusic = async (playlist_id) => {
    try {
        const query = `
            SELECT * FROM playlist_music WHERE playlist_id = ?
        `;
        const [rows] = await db.execute(query, [playlist_id]);
        return rows;
    } catch (error) {
        throw new Error('Error fetching playlist music: ' + error.message);
    }
};

// 음악 ID로 이미지 URL 조회
const getImageUrlByPlaylistMusicId = (playlistMusicId, callback) => {
    const query = 'SELECT album_image_url FROM playlist_music WHERE playlist_music_id = ?';
    db.execute(query, [playlistMusicId], callback);
};

// 음악 ID로 장르 조회
const getGenreByPlaylistMusicId = (playlistMusicId, callback) => {
    const query = 'SELECT genre FROM playlist_music WHERE playlist_music_id = ?';
    db.execute(query, [playlistMusicId], callback);
};

module.exports = {
    savePlaylistMusic,
    getPlaylistMusic,
    getImageUrlByPlaylistMusicId,
    getGenreByPlaylistMusicId
};
