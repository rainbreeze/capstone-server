// routes/mypageRoutes.js 수정.

const express = require('express');
const router = express.Router();
const mypageController = require('../controllers/mypageController');  // 컨트롤러 가져오기

router.get('/:userId', mypageController.getMyPage);

module.exports = router;
