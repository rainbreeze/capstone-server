const db = require('../config/db'); // DB 연결

//게임 스탯 저장
const saveStageStats = async(userId, stage, answer, steps, jumps, sprints, playTime, cleared) => {
    const [result] = await db.execute(
        `INSERT INTO game_stats (userId, stage, answer, steps, jumps, sprints, play_time, cleared) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`, [userId, stage, steps, jumps, sprints, playTime, cleared]
    );
    return result;
};

module.exports = {
    saveStageStats,
};