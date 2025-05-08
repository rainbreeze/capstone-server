const express = require('express');
const router = express.Router();
const playlistMusicController = require('../controllers/playlistMusicController');

// 플레이리스트 음악 ID로 이미지 URL 조회
router.get('/image/:playlistMusicId', playlistMusicController.getImageUrl);
router.get('/genre/:playlistMusicId', playlistMusicController.getGenre);

module.exports = router;
