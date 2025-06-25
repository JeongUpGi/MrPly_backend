const db = require("./db");

// 로그 저장 (INSERT)
exports.insertPlayLog = (videoId, title, artist, playedAt, callback) => {
  const sql = `
    INSERT INTO play_logs (video_id, title, artist, playCount, last_played_date)
    VALUES (?, ?, ?, 1, ?)
    ON DUPLICATE KEY UPDATE
      playCount = playCount + 1,
      last_played_date = VALUES(last_played_date),
      title = VALUES(title),
      artist = VALUES(artist)
  `;
  db.query(sql, [videoId, title, artist, playedAt], callback);
};

// 로그 조회 (SELECT)
exports.selectPlayLogs = (callback) => {
  const sql = `
    SELECT id, video_id, title, artist, playCount, last_played_date
    FROM play_logs
    ORDER BY playCount DESC, last_played_date DESC
    LIMIT 100
  `;
  db.query(sql, callback);
};
