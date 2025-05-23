const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

router.get('/full/:userId', playlistController.getFullPlaylist);

// 플레이리스트 ID 조회
router.get('/:userId', playlistController.getPlaylistIds);

// 플레이리스트 생성일 조회
router.get('/playlist/:playlistId/created_at', playlistController.getCreationTime);

// 플레이리스트에 해당하는 음악 ID 조회
router.get('/playlistmusic/:playlistId', playlistController.getPlaylistMusicIds);

router.delete('/:playlistId', playlistController.deletePlaylist);

module.exports = router;
