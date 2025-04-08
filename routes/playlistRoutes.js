const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

// 플레이리스트 ID 조회
router.get('/:userId', playlistController.getPlaylistIds);

// 플레이리스트에 해당하는 음악 ID 조회
router.get('/playlistmusic/:playlistId', playlistController.getPlaylistMusicIds);

module.exports = router;
