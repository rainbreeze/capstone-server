// controllers/gameController.js

const gameModel = require('../models/gameModel');

// 게임 데이터 저장 API 처리
const saveGameData = (req, res) => {
    const { userId, score, genre, year, artist, hipster } = req.body;

    // 모델 함수 호출
    gameModel.saveGameData(userId, score, genre, year, artist, hipster, (err, result) => {
        if (err) {
            return res.status(500).json({ error: '데이터 저장 실패' });
        }
        res.status(200).json({ message: '데이터가 성공적으로 저장되었습니다!' });
    });
};

module.exports = {
    saveGameData,
};
