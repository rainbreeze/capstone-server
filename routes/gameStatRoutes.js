// routes/saveGameStatRoutes.js

const express = require('express');
const gameStatController = require('../controllers/gameStatController'); // 컨트롤러 가져오기

const router = express.Router();

// 게임 데이터 저장 API
router.post('/saveStageStats', gameStatController.saveStageStats);

module.exports = router;