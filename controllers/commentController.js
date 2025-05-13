// controllers/commentController.js
const commentModel = require('../models/commentModel');

// 댓글 생성 컨트롤러
const createComment = (req, res) => {
    console.log('코맨트 컨트롤러 실행')
    const reviewId = req.params.reviewId;
    const { comment, user_id } = req.body;

    if (!user_id || !comment) {
        return res.status(400).json({ error: 'user_id 또는 comment가 누락되었습니다.' });
    }

    console.log('코맨트 컨트롤러 파라미터 검증')

    commentModel.insertComment(reviewId, user_id, comment, (err, result) => {
        if (err) {
            console.error('댓글 생성 오류:', err);
            return res.status(500).json({ error: '댓글 등록 중 오류가 발생했습니다.' });
        }

        res.status(201).json({
            message: '댓글이 성공적으로 등록되었습니다.',
            commentId: result.insertId,
        });
    });
};

// 댓글 목록 조회 (선택)
const getComments = (req, res) => {
    const reviewId = req.params.reviewId;

    commentModel.getCommentsByReviewId(reviewId, (err, comments) => {
        if (err) {
            console.error('댓글 목록 조회 오류:', err);
            return res.status(500).json({ error: '댓글 목록 조회 실패' });
        }

        res.status(200).json(comments);
    });
};

module.exports = {
    createComment,
    getComments,
};
