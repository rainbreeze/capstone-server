const db = require('../config/db');

// 리뷰 저장
const saveReview = async (user_id, playlist_music_id, album_image_url, genre, rating, comment) => {
    console.log('리뷰 생성 모델 실행');
    const query = `
        INSERT INTO reviews (user_id, playlist_music_id, album_image_url, genre, rating, comment)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    try {
        const result = await db.execute(query, [user_id, playlist_music_id, album_image_url, genre, rating, comment]);
        return result;
    } catch (error) {
        console.error('쿼리 실행 중 에러 발생:', error);
        throw error;
    }
};

// 특정 음악에 대한 리뷰 조회
const getReviewsByPlaylistMusicId = async (playlist_music_id) => {
    const query = `
        SELECT * FROM reviews WHERE playlist_music_id = ? ORDER BY created_at DESC
    `;
    const rows = await db.execute(query, [playlist_music_id]);
    return rows;
};

// 전체 리뷰 리스트 (예시: 관리자용)
const getAllReviews = (callback) => {
    const query = `
        SELECT * FROM reviews
        ORDER BY created_at DESC 
        LIMIT 5
    `;
    db.query(query, (err, rows) => {
        console.log('모델 실행')
        if (err) return callback(err, null);
        callback(null, rows);
    });
};

module.exports = {
    saveReview,
    getReviewsByPlaylistMusicId,
    getAllReviews
};
