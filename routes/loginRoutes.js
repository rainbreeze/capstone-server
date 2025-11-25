const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

// 기존 로그인 API
router.post('/', loginController.login);

// 카카오 로그인 콜백 API 라우트 추가
router.get('/kakao/callback', loginController.kakaoCallback);

module.exports = router;