// routes/replyRoutes.js
const express = require('express');
const router = express.Router();
const replyController = require('../controllers/replyController');

// 답글 등록
router.post('/:reviewId/reply', replyController.createReply);

// 특정 댓글의 답글 조회
router.get('/:parentId/replies', replyController.getReplies);

module.exports = router;
