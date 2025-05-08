const playlistMusicModel = require('../models/playlistMusicModel');

// 플레이리스트 음악 ID로 이미지 URL 조회
const getImageUrl = (req, res) => {
    const playlistMusicId = req.params.playlistMusicId;

    playlistMusicModel.getImageUrlByPlaylistMusicId(playlistMusicId, (err, results) => {
        if (err) {
            console.error('쿼리 실행 중 오류 발생:', err);
            return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: '해당 음악을 찾을 수 없습니다.' });
        }

        res.json({ album_image_url: results[0].album_image_url });
    });
};

const getGenre = (req,res) => {
    const playlistMusicId = req.params.playlistMusicId;

    playlistMusicModel.getGenreByPlaylistMusicId(playlistMusicId, (err,results) => {
        if (err) {
            console.error('쿼리 실행중 에러 발생');
            return res.status(500).json({message: '서버 오류 발생'});
        }
        if(results.length === 0) {
            return res.status(404).json({message: '찾을 수 없음'});
        }
        res.json({ genre: results[0].genre});
    });
};

module.exports = {
    getImageUrl,
    getGenre
};
