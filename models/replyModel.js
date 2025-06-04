const db = require('../config/db');

// 답글 생성
const insertReply = (review_id, user_id, content, parent_comment_id, user_name, user_profile, callback) => {
    console.log('답글 생성 모델 실행');

    db.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.beginTransaction(err => {
            if (err) {
                connection.release();
                return callback(err);
            }

            const insertQuery = `
                INSERT INTO comments (review_id, user_id, content, parent_comment_id, user_name, user_profile)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            connection.query(insertQuery, [review_id, user_id, content, parent_comment_id, user_name, user_profile], (err, insertResult) => {
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

// 특정 댓글의 답글 조회
const getRepliesByCommentId = (parent_comment_id, callback) => {
    const query = `
        SELECT * FROM comments
        WHERE parent_comment_id = ?
        ORDER BY created_at ASC
    `;

    db.query(query, [parent_comment_id], (err, rows) => {
        if (err) return callback(err);
        callback(null, rows);
    });
};

module.exports = {
    insertReply,
    getRepliesByCommentId,
};
