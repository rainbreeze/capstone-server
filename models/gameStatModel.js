const db = require('../config/db'); // DB 연결

console.log("🟢 현재 로드된 게임 스탯 모델 경로:", __filename);



//게임 스탯 저장
const saveGameStats = async(userId, answer, steps, jumps, sprints, playTime, cleared) => {
    const [result] = await db.execute(
        `INSERT INTO game_stats (userId, steps, sprints, play_time, jumps, cleared, answer) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`, [userId, steps, sprints, playTime, jumps, cleared, answer]
    );
    return result;
};


module.exports = {
    saveGameStats,
};