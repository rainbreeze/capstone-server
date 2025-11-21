const statsModel = require('../models/gameStatModel');

const saveGameStats = async(req, res) => {
    const { userId, answer, steps, jumps, sprints, playTime, cleared } = req.body;

    try {
        const result = await statsModel.saveGameStats(userId, answer, steps, jumps, sprints, playTime, cleared);
        console.log('게임 데이터 저장 성공:', result);

        res.status(200).json({
            message: '게임 데이터 저장 성공',
            data: { userId, answer, steps, jumps, sprints, playTime, cleared }
        });
    } catch (error) {
        console.error('게임 데이터 저장 실패:', error);
        res.status(500).json({ error: '게임 데이터 저장 실패' });
    }
};

module.exports = {
    saveGameStats,
};