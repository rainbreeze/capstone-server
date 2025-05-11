const reviewModel = require('../models/reviewModel');

// 리뷰 저장 (POST)
const createReview = async (req, res) => {
    console.log('컨트롤러 실행');
    try {
        const { user_id, playlist_music_id, album_image_url, genre, rating, comment } = req.body;

        if (!user_id || !playlist_music_id || !rating) {
            return res.status(400).json({ message: '필수 항목이 누락되었습니다.' });
        }

        const result = await reviewModel.saveReview(user_id, playlist_music_id, album_image_url, genre, rating, comment);
        res.status(201).json({ message: '리뷰 저장 완료', review_id: result.insertId });
    } catch (error) {
        console.error('리뷰 저장 오류:', error.message);
        res.status(500).json({ message: '서버 오류' });
    }
};

// 특정 음악의 리뷰들 조회 (GET)
const getReviews = async (req, res) => {
    try {
        const playlist_music_id = req.params.playlistMusicId;
        const reviews = await reviewModel.getReviewsByPlaylistMusicId(playlist_music_id);
        res.json(reviews);
    } catch (error) {
        console.error('리뷰 조회 오류:', error.message);
        res.status(500).json({ message: '서버 오류' });
    }
};

// 전체 리뷰 조회
const getAllReviews = (req, res) => {
    console.log('리뷰 컨트롤러 전체 조회 실행.');
    reviewModel.getAllReviews((err, reviews) => {
        if (err) {
            console.error('전체 리뷰 조회 오류:', err.message);
            return res.status(500).json({ message: '서버 오류' });
        }
        res.json(reviews);
    });
};

// like_count 증가
const likeReview = (req, res) => {
    const { reviewId } = req.params;
    reviewModel.incrementLikeCount(reviewId, (err, result) => {
        if (err) return res.status(500).json({ error: 'DB error' });
        res.json({ message: 'Like count increased', result });
    });
};

module.exports = {
    createReview,
    getReviews,
    getAllReviews,
    likeReview
};
