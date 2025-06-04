const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const mypageController = require('../controllers/mypageController');

// 파일 저장 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

// 마이페이지 정보
router.get('/:userId', mypageController.getMyPage);

// 프로필 이미지 업로드
router.post('/:userId/profile-image', upload.single('profileImage'), mypageController.uploadProfileImage);

// 프로필 이미지 조회
router.get('/:userId/profile-image', mypageController.getProfileImage);

module.exports = router;
