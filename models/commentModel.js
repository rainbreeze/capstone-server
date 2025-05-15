// models/commentModel.js
const db = require('../config/db');// 커넥션 풀 가져오기

const insertComment = (review_id, user_id, content, callback) => {
    console.log('댓글 생성 모델 실행');

    db.getConnection((err, connection) => {
        if (err) {
            console.error('DB 커넥션 오류:', err);
            return callback(err, null);
        }

        // 트랜잭션 시작
        connection.beginTransaction(err => {
            if (err) {
                connection.release();
                console.error('트랜잭션 시작 실패:', err);
                return callback(err, null);
            }

            const insertQuery = `
                INSERT INTO comments (review_id, user_id, content)
                VALUES (?, ?, ?)
            `;

            connection.query(insertQuery, [review_id, user_id, content], (err, insertResult) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error('댓글 INSERT 실패:', err);
                        connection.release();
                        return callback(err, null);
                    });
                }

                const updateQuery = `
                    UPDATE reviews SET comment_count = comment_count + 1
                    WHERE review_id = ?
                `;

                connection.query(updateQuery, [review_id], (err, updateResult) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error('댓글 수 증가 실패:', err);
                            connection.release();
                            return callback(err, null);
                        });
                    }

                    // 모든 쿼리 성공 → 커밋
                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                console.error('커밋 실패:', err);
                                connection.release();
                                return callback(err, null);
                            });
                        }

                        console.log('댓글 생성 및 댓글 수 증가 완료');
                        connection.release();
                        callback(null, insertResult); // 결과 반환
                    });
                });
            });
        });
    });
};

module.exports = {
    insertComment,
    // ...기타 메서드들
};


const deleteComment = (commentId, callback) => {
    db.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.beginTransaction(err => {
            if (err) {
                connection.release();
                return callback(err);
            }

            // 1. 삭제하려는 댓글의 review_id 조회
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

                // 2. 댓글 삭제
                const deleteQuery = `
                    DELETE FROM comments WHERE comment_id = ?
                `;

                connection.query(deleteQuery, [commentId], (err, deleteResult) => {
                    if (err || deleteResult.affectedRows === 0) {
                        return connection.rollback(() => {
                            connection.release();
                            callback(err || new Error('댓글 삭제 실패'));
                        });
                    }

                    // 3. 리뷰 댓글 수 감소
                    const updateQuery = `
                        UPDATE reviews SET comment_count = comment_count - 1
                        WHERE review_id = ?
                    `;

                    connection.query(updateQuery, [reviewId], (err, updateResult) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                callback(err);
                            });
                        }

                        // 4. 커밋
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
    deleteComment,
    getCommentsByReviewId,
};
