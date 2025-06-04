// controllers/replyController.js
const replyModel = require('../models/replyModel');

// 답글 생성
const createReply = (req, res) => {
    console.log('답글 생성 컨트롤러 실행');

    const reviewId = req.params.reviewId;
    const { comment, user_id, parent_comment_id, user_name, user_profile } = req.body;

    if (!user_id || !comment || !parent_comment_id) {
        return res.status(400).json({ error: 'user_id, comment, parent_comment_id가 필요합니다.' });
    }

    replyModel.insertReply(reviewId, user_id, comment, parent_comment_id, user_name, user_profile, (err, result) => {
        if (err) {
            console.error('답글 생성 오류:', err);
            return res.status(500).json({ error: '답글 등록 중 오류가 발생했습니다.' });
        }

        res.status(201).json({
            message: '답글이 성공적으로 등록되었습니다.',
            replyId: result.insertId,
        });
    });
};

// 특정 댓글에 달린 답글 조회
const getReplies = (req, res) => {
    const parentId = req.params.parentId;
    console.log('답글 조회');

    replyModel.getRepliesByCommentId(parentId, (err, replies) => {
        if (err) {
            console.error('답글 조회 오류:', err);
            return res.status(500).json({ error: '답글 조회 실패' });
        }

        res.status(200).json(replies);
    });
};

module.exports = {
    createReply,
    getReplies,
};
