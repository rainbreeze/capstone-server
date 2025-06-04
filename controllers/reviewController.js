const reviewModel = require('../models/reviewModel');

const createReview = (req, res) => {
    console.log('리뷰 생성 컨트롤러 실행행')
    const { user_id, playlist_music_id, album_image_url, genre, rating, comment, playlist_music_name, user_name, user_profile } = req.body;
    console.log(user_id, playlist_music_id, album_image_url, genre, rating, comment, playlist_music_name, user_name, user_profile);
    if (!user_id || !playlist_music_id || !rating) {
        return res.status(400).json({ message: '필수 항목이 누락되었습니다.' });
    }

    reviewModel.saveReview(user_id, playlist_music_id, album_image_url, genre, rating, comment, playlist_music_name, user_name, user_profile, (err, result) => {
        if (err) {
            console.error('리뷰 저장 오류:', err.message);
            return res.status(500).json({ message: '서버 오류' });
        }
        res.status(201).json({ message: '리뷰 저장 완료', review_id: result.insertId });
    });
};

// 특정 음악의 리뷰들 조회 (GET)
const getReviews = async (req, res) => {
    try {
        console.log('리뷰 컨트롤러 조회 실행.');
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
    console.log('리뷰 컨트롤러 조회 실행.');
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

// like_count 증가
const unLikeReview = (req, res) => {
    const { reviewId } = req.params;
    reviewModel.decrementLikeCount(reviewId, (err, result) => {
        if (err) return res.status(500).json({ error: 'DB error' });
        res.json({ message: 'Like count increased', result });
    });
};

module.exports = {
    createReview,
    getReviews,
    getAllReviews,
    likeReview,
    unLikeReview
};
