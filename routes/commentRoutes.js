// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// POST /reviews/:reviewId/comments - 댓글 등록
router.post('/:reviewId/comment', commentController.createComment);

// GET /reviews/:reviewId/comments - 댓글 목록 조회 (선택)
router.get('/:reviewId/comment', commentController.getComments);

module.exports = router;
