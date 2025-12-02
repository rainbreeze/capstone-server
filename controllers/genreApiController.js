const mlService = require('../services/mlService');

exports.hello = async(req, res) => {
    try {
        const response = await mlService.hello();
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'FastAPI 호출 실패' });
    }
};

exports.predict = async(req, res) => {
    try {
        const inputData = req.body;
        const prediction = await mlService.predict(inputData);
        res.json(prediction);
    } catch (error) {
        res.status(500).json({ error: 'FastAPI 예측 실패' });
    }
};