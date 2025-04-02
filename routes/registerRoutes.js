// routes/registerRoutes.js

const express = require('express');
const registerController = require('../controllers/registerController');  // 컨트롤러 가져오기

const router = express.Router();

// 회원가입 API
router.post('/', registerController.register);

module.exports = router;
