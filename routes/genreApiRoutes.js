// routes/genreApiRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// dotenv를 통해 환경변수 불러오기 (.env 파일 사용)
const dotenv = require('dotenv');
dotenv.config();

// BASE_URL: .env 파일에 정의된 FastAPI 서버 주소 사용
const BASE_URL = process.env.FASTAPI_BASE_URL

// GET /hello 라우트 추가
router.get('/hello', async (req, res) => {
    try {
        console.log('hello 동작');

        // FastAPI /hello GET 요청 보내기
        const response = await axios.get(`${BASE_URL}/hello`);

        res.json(response.data);
    } catch (error) {
        console.error('FastAPI /hello 호출 실패:', error.message);
        res.status(500).json({ error: 'FastAPI 서버 호출에 실패했습니다.' });
    }
});

// 새로 추가하는 /predict 라우트 (POST)
router.post('/predict', async (req, res) => {
    try {
        // 클라이언트가 보낸 9개 특성값 JSON 그대로 FastAPI로 전달
        console.log('predict동작')
        const inputData = req.body;

        const response = await axios.post(`${BASE_URL}/predict`, inputData);

        // FastAPI에서 온 예측 결과 그대로 클라이언트에 전달
        res.json(response.data);
    } catch (error) {
        console.error('FastAPI /predict 호출 실패:', error.message);
        res.status(500).json({ error: 'FastAPI 서버 호출에 실패했습니다.' });
    }
});

module.exports = router;
