const db = require('../config/db');

// 댓글 생성
const insertComment = (review_id, user_id, content, callback) => {
    console.log('댓글 생성 모델 실행');

    db.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.beginTransaction(err => {
            if (err) {
                connection.release();
                return callback(err);
            }

            const insertQuery = `
                INSERT INTO comments (review_id, user_id, content)
                VALUES (?, ?, ?)
            `;

            connection.query(insertQuery, [review_id, user_id, content], (err, insertResult) => {
                if (err) {
                    return connection.rollback(() => {
                        connection.release();
                        callback(err);
                    });
                }

                const updateQuery = `
                    UPDATE reviews SET comment_count = comment_count + 1
                    WHERE review_id = ?
                `;

                connection.query(updateQuery, [review_id], (err) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            callback(err);
                        });
                    }

                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                callback(err);
                            });
                        }

                        connection.release();
                        callback(null, insertResult);
                    });
                });
            });
        });
    });
};

// 댓글 삭제
const deleteComment = (commentId, callback) => {
    db.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.beginTransaction(err => {
            if (err) {
                connection.release();
                return callback(err);
            }

            const selectQuery = `
                SELECT review_id FROM comments WHERE comment_id = ?
            `;

            connection.query(selectQuery, [commentId], (err, results) => {
                if (err || results.length === 0) {
                    return connection.rollback(() => {
                        connection.release();
                        callback(err || new Error('댓글을 찾을 수 없습니다.'));
                    });
                }

                const reviewId = results[0].review_id;

                const deleteQuery = `
                    DELETE FROM comments WHERE comment_id = ?
                `;

                connection.query(deleteQuery, [commentId], (err, deleteResult) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            callback(err);
                        });
                    }

                    const updateQuery = `
                        UPDATE reviews SET comment_count = comment_count - 1
                        WHERE review_id = ?
                    `;

                    connection.query(updateQuery, [reviewId], (err) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                callback(err);
                            });
                        }

                        connection.commit(err => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    callback(err);
                                });
                            }

                            connection.release();
                            callback(null, deleteResult);
                        });
                    });
                });
            });
        });
    });
};

const getCommentsByReviewId = (review_id, callback) => {
    const query = `
        SELECT * FROM comments
        WHERE review_id = ?
        ORDER BY parent_comment_id ASC, created_at ASC
    `;
    
    db.query(query, [review_id], (err, rows) => {
        if (err) return callback(err);

        // 댓글과 답글을 구분하여 구조화
        const comments = [];
        const replies = [];

        rows.forEach((row) => {
            if (row.parent_comment_id === null) {
                comments.push(row);  // 원본 댓글
            } else {
                replies.push(row);  // 답글
            }
        });

        // 댓글에 대한 답글을 연결
        comments.forEach(comment => {
            comment.replies = replies.filter(reply => reply.parent_comment_id === comment.comment_id);
        });

        callback(null, comments);  // 댓글과 답글을 구조화한 결과 반환
    });
};

module.exports = {
    insertComment,
    deleteComment,
    getCommentsByReviewId,
};
