// controllers/mypageController.js

const { getUserById } = require('../models/mypageModel');

const getMyPage = async (req, res) => {
    try {
        console.log('마이페이지 컨트롤러 작동 확인.')
        const userId = req.params.userId;
        console.log('유저 아이디 확인: ' + userId);

        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const user = await getUserById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) {
        console.error('mypage error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getMyPage };
