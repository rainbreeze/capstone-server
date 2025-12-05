const db = require('../config/db');

const saveReview = (user_id, playlist_music_id, album_image_url, genre, rating, comment,playlist_music_name, user_name, user_profile, callback) => {
    const query = `
        INSERT INTO reviews (user_id, playlist_music_id, album_image_url, genre, rating, comment, playlist_music_name, user_name, user_profile)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [user_id, playlist_music_id, album_image_url, genre, rating, comment, playlist_music_name, user_name, user_profile], callback);
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
        LIMIT 23
    `;
    db.query(query, (err, rows) => {
        console.log('모델 실행')
        if (err) return callback(err, null);
        callback(null, rows);
    });
};

// 특정 리뷰의 like_count를 1 증가시키는 함수
const incrementLikeCount = (reviewId, callback) => {
    const query = `
        UPDATE reviews
        SET like_count = like_count + 1
        WHERE review_id = ?
    `;
    db.query(query, [reviewId], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

// 특정 리뷰의 like_count를 1 증가시키는 함수
const decrementLikeCount = (reviewId, callback) => {
    const query = `
        UPDATE reviews
        SET like_count = like_count - 1
        WHERE review_id = ?
    `;
    db.query(query, [reviewId], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

module.exports = {
    saveReview,
    getReviewsByPlaylistMusicId,
    getAllReviews,
    incrementLikeCount,
    decrementLikeCount
};
