const statsModel = require('../models/gameStatModel');
const { getDataset, applyChoices, applyStats, createAnswerJSON, convertDatasetToFormData } = require('../services/dataSetService');
const mlService = require('../services/mlService');
const playlistService = require('../services/playlistService');




const saveGameStats = async(req, res) => {
    const { userId, answer, score, steps, jumps, sprints, playTime, cleared } = req.body;

    console.log("전달 받은 값",
        userId, answer, steps, score, jumps, sprints, playTime, cleared
    );


    try {
        //1차 게임 stat 전처리
        let dataset = getDataset();

        const year = Math.floor(Math.random() * (2025 - 1990 + 1)) + 1990;
        const parsedScore = score ? parseInt(score, 10) : null;

        dataset = applyChoices(dataset, answer);

        dataset = applyStats(dataset, { steps, jumps, sprints, playTime });

        dataset = createAnswerJSON(dataset);
        console.log('dataset: ', dataset);
        //2차 db 저장
        const result = await statsModel.saveGameStats(userId, dataset, score, steps, jumps, sprints, playTime, cleared);

        //3차 머신러닝 넣기 전 전처리 작업 -> payload 포함
        const formData = convertDatasetToFormData(dataset);

        //4차 머신러닝 호출
        const prediction = await mlService.predict(formData);
        const predictedGenre = prediction.predicted_genre;

        //5) 플레이리스트 생성
        const recommendedTracks = await playlistService.generatePlaylist(
            userId,
            predictedGenre,
            parsedScore,
            year
        );



        res.status(200).json({
            message: '게임 데이터 저장 성공',
            data: { userId, dataset, score, steps, jumps, sprints, playTime, cleared },
            formData,
            predictedGenre: predictedGenre,
            playlist: recommendedTracks
        });

    } catch (error) {
        console.error('게임 데이터 저장 실패:', error);
        res.status(500).json({ error: '게임 데이터 저장 실패' });
    }



};

module.exports = {
    saveGameStats,
};