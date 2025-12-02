const db = require('../config/db'); // DB 연결

console.log("🟢 현재 로드된 게임 스탯 모델 경로:", __filename);



//게임 스탯 저장
const saveGameStats = async(userId, answer, score, steps, jumps, sprints, playTime, cleared) => {
    const query = `
        INSERT INTO game_stats
        (userId, answer,score, steps, jumps, sprints, play_time, cleared)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await db.execute(query, [
        userId,
        answer,
        score,
        steps,
        jumps,
        sprints,
        playTime,
        cleared
    ]);

    return result;
};



module.exports = {
    saveGameStats,
};