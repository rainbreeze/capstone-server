const statsModel = require('../models/gameStatModel');
const { getDataset, applyChoices, applyStats, createAnswerJSON, convertDatasetToFormData } = require('../services/dataSetService');

const saveGameStats = async(req, res) => {
    const { userId, answer, steps, jumps, sprints, playTime, cleared } = req.body;

    console.log("전달 받은 값",
        userId, answer, steps, jumps, sprints, playTime, cleared
    );



    try {
        //1차 게임 stat 전처리
        let dataset = getDataset();

        dataset = applyChoices(dataset, answer);

        dataset = applyStats(dataset, { steps, jumps, sprints, playTime });

        dataset = createAnswerJSON(dataset);
        console.log('dataset: ', dataset);
        //2차 db 저장
        const result = await statsModel.saveGameStats(userId, dataset, steps, jumps, sprints, playTime, cleared);

        //3차 머신러닝 넣기 전 전처리 작업
        const formData = convertDatasetToFormData(dataset);

        res.status(200).json({
            message: '게임 데이터 저장 성공',
            data: { userId, dataset, steps, jumps, sprints, playTime, cleared },
            formData: formData
        });
    } catch (error) {
        console.error('게임 데이터 저장 실패:', error);
        res.status(500).json({ error: '게임 데이터 저장 실패' });
    }



};

module.exports = {
    saveGameStats,
};