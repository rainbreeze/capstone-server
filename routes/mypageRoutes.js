// routes/mypageRoutes.js

const express = require('express');
const router = express.Router();
const { getMyPage } = require('../controllers/mypageController');
const authenticate = require('../middleware/authenticate');

router.get('/mypage', authenticate, getMyPage);

module.exports = router;
