// models/commentModel.js
const db = require('../config/db');

// 댓글 저장
const insertComment = (review_id, user_id, content, callback) => {
    console.log('댓글 생성 모델 실행');

    const query = `
        INSERT INTO comments (review_id, user_id, content)
        VALUES (?, ?, ?)
    `;

    db.query(query, [review_id, user_id, content], (err, result) => {
        if (err) {
            console.error('댓글 INSERT 실패:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

// 특정 리뷰의 댓글 전체 조회 (선택적으로 추가 가능)
const getCommentsByReviewId = (review_id, callback) => {
    const query = `
        SELECT * FROM comments
        WHERE review_id = ?
        ORDER BY created_at ASC
    `;

    db.query(query, [review_id], (err, rows) => {
        if (err) return callback(err, null);
        callback(null, rows);
    });
};

module.exports = {
    insertComment,
    getCommentsByReviewId,
};
