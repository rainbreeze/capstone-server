const express = require('express');
const router = express.Router();
const genreApiController = require('../controllers/genreApiController');

router.get('/hello', genreApiController.hello);
router.post('/predict', genreApiController.predict);

module.exports = router;