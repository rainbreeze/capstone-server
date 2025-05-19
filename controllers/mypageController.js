// controllers/mypageController.js

const { getUserById } = require('../models/mypageModel');

const getMyPage = async (req, res) => {
    try {
        const userId = req.user?.id;
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
