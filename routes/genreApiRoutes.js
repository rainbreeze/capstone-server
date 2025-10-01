// routes/genreApiRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET /genreapi/hello → 외부 FastAPI 서버에 요청해서 받은 결과를 그대로 응답
router.get('/hello', async (req, res) => {
    try {
        console.log('genreapi실행')
        const response = await axios.get('https://web-production-609c.up.railway.app/hello');
        res.json(response.data);  // 받은 응답을 클라이언트에게 그대로 전달
    } catch (error) {
        console.error('FastAPI 호출 실패:', error.message);
        res.status(500).json({ error: 'FastAPI 서버 호출에 실패했습니다.' });
    }
});

module.exports = router;
