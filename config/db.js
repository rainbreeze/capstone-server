// config/db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'maglev.proxy.rlwy.net',
    user: 'root',
    password: 'XKgncJXdXqGqAwJTOaPBAuSLxpZRYGqG',
    database: 'railway',
    port: 30153,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
});

// (선택) 연결 확인
pool.getConnection((err, connection) => {
    if (err) {
        console.error('MySQL 풀 연결 실패:', err);
        return;
    }
    console.log('MySQL 풀 연결 성공');
    connection.release();
});

module.exports = pool;