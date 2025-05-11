const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// 리뷰 등록
router.post('/', reviewController.createReview);

// 특정 음악에 대한 리뷰 목록 조회
router.get('/:playlistMusicId', reviewController.getReviews);

// 전체 리뷰 조회 (관리자용)
router.get('/', reviewController.getAllReviews);

// 리뷰 좋아요 (like_count +1)
router.post('/:reviewId/like', reviewController.likeReview);

// 리뷰 좋아요 해제 (like_count -1)
router.post('/:reviewId/unLike', reviewController.unLikeReview);

module.exports = router;
