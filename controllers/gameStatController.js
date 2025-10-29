const statsModel = require('../models/gameStatModel');

const saveStageStats = async(req, res) => {
    const { userId, stage, answer, steps, jumps, sprints, playTime, cleared } = req.body;

    try {
        const result = await statsModel.saveStageStats(userId, stage, answer, steps, jumps, sprints, playTime, cleared);
        console.log('스테이지 데이터 저장 성공:', result);

        res.status(200).json({
            message: '스테이지 데이터 저장 성공',
            data: { userId, stage, answer, steps, jumps, sprints, playTime, cleared }
        });
    } catch (error) {
        console.error('스테이지 데이터 저장 실패:', error);
        res.status(500).json({ error: '스테이지 데이터 저장 실패' });
    }
};

module.exports = {
    saveStageStats,
};