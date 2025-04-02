// routes/loginRoutes.js

const express = require('express');
const loginController = require('../controllers/loginController');  // 컨트롤러 가져오기

const router = express.Router();

// 로그인 API
router.post('/', loginController.login);

module.exports = router;
