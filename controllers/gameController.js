const gameModel = require('../models/gameModel');
const spotifyService = require('../services/spotifyService');  // Spotify 서비스 호출

// 게임 데이터 저장 API 처리
const saveGameData = async (req, res) => {
    const { userId, score, genre, year, hipster } = req.body;

    try {
        const newGameData = await gameModel.saveGameData(userId, score, genre, year, hipster);
        console.log('게임 데이터 저장 성공:', newGameData);

        // 음악 추천을 받기 위한 API 호출
        const recommendedTracks = await spotifyService.searchSpotifyTracks(genre, year, hipster);

        // 추천된 곡들 출력 (터미널에)
        recommendedTracks.forEach((track, index) => {
            console.log(`${index + 1}. ${track.name} - ${track.artists.map(artist => artist.name).join(', ')} (${track.album.name})`);
        });

        // 추천된 곡들을 클라이언트로 전송
        res.status(200).json({
            message: '게임 데이터 저장 및 음악 추천 성공!',
            musicRecommendation: recommendedTracks  // 추천된 곡 정보 전송
        });
    } catch (error) {
        console.error('추천 실패:', error);
        res.status(500).json({ error: '음악 추천 실패' });
    }
};

module.exports = {
    saveGameData,
};
