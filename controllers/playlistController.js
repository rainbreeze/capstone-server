const playlistModel = require('../models/playlistModel');

// 플레이리스트 ID 조회
const getPlaylistIds = (req, res) => {
    const userId = req.params.userId;

    playlistModel.getPlaylistIdsByUserId(userId, (err, results) => {
        console.log('유저로부터 ID 가져오기 플레이리스트.')
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

const deletePlaylist = (req,res) => {
    const { playlistId } = req.params;

    playlistModel.deletePlaylistMusicByPlaylistId(playlistId, (err,result) => {
        if (err) {
            console.error('플레이 리스트 음악들 삭제중 오류');
            return res.status(500).json({message: '서버 오류'});
        }
    })

    playlistModel.deletePlaylistById(playlistId, (err,result) => {
        if (err) {
            console.error('플레이 리스트 삭제중 오류', err);
            return res.status(500).json({ message: '서버 오류 발생'});
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({message: '해당 플레이 리스트가 존재하지 않음'});
        }

        res.json({message: '플레이리스트가 성공적으로 삭제됨.'});
    })
};

module.exports = {
    getPlaylistIds,
    getPlaylistMusicIds,
    getCreationTime,
    deletePlaylist
};
