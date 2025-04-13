const playlistModel = require('../models/playlistModel');

// 플레이리스트 ID 조회
const getPlaylistIds = (req, res) => {
    const userId = req.params.userId;

    playlistModel.getPlaylistIdsByUserId(userId, (err, results) => {
        if (err) {
            console.error('쿼리 실행 중 오류 발생:', err);
            return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: '플레이리스트가 없습니다.', playlistIds: [] });
        }

        const playlists = results.map(row => ({
            playlistId: row.playlist_id,
            createdAt: row.created_at,
        }));

        res.json({ playlists });
    });
};

// 플레이리스트에 해당하는 음악 ID 조회
const getPlaylistMusicIds = (req, res) => {
    const playlistId = req.params.playlistId;

    playlistModel.getPlaylistMusicIdsByPlaylistId(playlistId, (err, results) => {
        if (err) {
            console.error('쿼리 실행 중 오류 발생:', err);
            return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: '해당 플레이리스트에 음악이 없습니다.', playlist_music_ids: [] });
        }

        const playlistMusicIds = results.map(row => row.playlist_music_id);
        res.json({ playlist_music_ids: playlistMusicIds });
    });
};

// 플레이리스트에 해당하는 음악 ID 조회
const getCreationTime = (req, res) => {
    const playlistId = req.params.playlistId;

    playlistModel.getCreationTimeByPlaylistId(playlistId, (err, results) => {
        if (err) {
            console.error('쿼리 실행 중 오류 발생:', err);
            return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: '해당 플레이리스트에 생성일이 없습니다.', playlist_music_ids: [] });
        }

        const creationTime = results[0].created_at;
        res.json({ created_at: creationTime });  // JSON 형식으로 응답
    });
};

module.exports = {
    getPlaylistIds,
    getPlaylistMusicIds,
    getCreationTime
};
