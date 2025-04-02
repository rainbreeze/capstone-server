// controllers/loginController.js

const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');  // 로그인 모델 가져오기

// JWT 비밀 키
const JWT_SECRET = 'your_jwt_secret_key';

// 로그인 API 처리
const login = (req, res) => {
    const { userId, password } = req.body;

    // 사용자 정보 조회
    loginModel.getUserById(userId, (err, result) => {
        if (err) {
            console.error('로그인 실패:', err);
            return res.status(500).json({ error: '로그인 실패' });
        }

        // 사용자 존재하지 않음
        if (result.length === 0) {
            return res.status(401).json({ error: '아이디 또는 비밀번호가 잘못되었습니다.' });
        }

        const user = result[0];

        // 비밀번호 비교
        loginModel.comparePassword(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('비밀번호 비교 실패:', err);
                return res.status(500).json({ error: '로그인 실패' });
            }

            // 비밀번호 일치하지 않음
            if (!isMatch) {
                return res.status(401).json({ error: '아이디 또는 비밀번호가 잘못되었습니다.' });
            }

            // JWT 토큰 생성
            const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: '로그인 성공!', token });
        });
    });
};

module.exports = {
    login,
};
