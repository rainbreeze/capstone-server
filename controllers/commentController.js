// controllers/commentController.js
const commentModel = require('../models/commentModel');

// 댓글 생성
const createComment = (req, res) => {
    console.log('댓글 생성 컨트롤러 실행');

    const reviewId = req.params.reviewId;
    const { comment, user_id, user_name, user_profile } = req.body;

    if (!user_id || !comment) {
        return res.status(400).json({ error: 'user_id 또는 comment가 누락되었습니다.' });
    }

    commentModel.insertComment(reviewId, user_id, comment, user_name, user_profile, (err, result) => {
        if (err) {
            console.error('댓글 생성 오류:', err);
            return res.status(500).json({ error: '댓글 등록 중 오류가 발생했습니다.' });
        }

        res.status(201).json({
            message: '댓글이 성공적으로 등록되었습니다.',
            commentId: result.insertId
        });
    });
};

// 댓글 전체 조회
const getComments = (req, res) => {
    const reviewId = req.params.reviewId;
    console.log('댓글 목록 조회');

    commentModel.getCommentsByReviewId(reviewId, (err, comments) => {
        if (err) {
            console.error('댓글 조회 오류:', err);
            return res.status(500).json({ error: '댓글 목록 조회 실패' });
        }
        console.log(comments);
        res.status(200).json(comments);
    });
};

// 댓글 삭제
const deleteComment = (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.body.user_id;

    if (!commentId || !userId) {
        return res.status(400).json({ error: '댓글 ID 또는 user_id가 누락되었습니다.' });
    }

    commentModel.deleteComment(commentId, (err, result) => {
        if (err) {
            console.error('댓글 삭제 오류:', err);
            return res.status(500).json({ error: '댓글 삭제 중 오류가 발생했습니다.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: '해당 댓글을 찾을 수 없습니다.' });
        }

        res.status(200).json({ message: '댓글이 성공적으로 삭제되었습니다.' });
    });
};

module.exports = {
    createComment,
    getComments,
    deleteComment,
};
