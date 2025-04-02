// routes/gameRoutes.js

const express = require('express');
const gameController = require('../controllers/gameController');  // 컨트롤러 가져오기

const router = express.Router();

// 게임 데이터 저장 API
router.post('/savegamedata', gameController.saveGameData);

module.exports = router;
