const db = require('../config/db'); // DB 연결

console.log("🟢 Loaded gameStatModel 최신버전");


//게임 스탯 저장
const saveGameStats = async(userId, answer, steps, jumps, sprints, playTime, cleared) => {
    const [result] = await db.execute(
        `INSERT INTO game_stats (userId, answer, steps, jumps, sprints, play_time, cleared) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`, [userId, answer, steps, jumps, sprints, playTime, cleared]
    );
    return result;
};


module.exports = {
    saveGameStats,
};