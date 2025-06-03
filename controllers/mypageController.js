const path = require('path');
const db = require('../config/db');

// 기존 getMyPage 유지
const getMyPage = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const [user] = await new Promise((resolve, reject) => {
            const query = 'SELECT userName, userId, email, createdAt, profileImage FROM users WHERE userId = ?';
            db.query(query, [userId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) {
        console.error('mypage error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// 프로필 이미지 업로드
const uploadProfileImage = (req, res) => {
    const userId = req.params.userId;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = file.filename;

    const query = 'UPDATE users SET profileImage = ? WHERE userId = ?';
    db.query(query, [imageUrl, userId], (err) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(200).json({ message: 'Upload success', imageUrl });
    });
};

// 프로필 이미지 조회
const getProfileImage = (req, res) => {
    const userId = req.params.userId;

    const query = 'SELECT profileImage FROM users WHERE userId = ?';
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        const imageUrl = results[0]?.profileImage || null;
        if (!imageUrl) return res.status(404).json({ message: 'No profile image found' });

        res.status(200).json({ imageUrl });
    });
};

module.exports = { getMyPage, uploadProfileImage, getProfileImage };