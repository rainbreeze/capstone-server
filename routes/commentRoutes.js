// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// 댓글 등록
router.post('/:reviewId/comment', commentController.createComment);

// 댓글 목록 조회
router.get('/:reviewId/comment', commentController.getComments);

// 댓글 삭제
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
