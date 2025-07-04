const db = require("./db");

// 로그 저장 (INSERT)
exports.insertPlayLog = (
  videoId,
  title,
  artist,
  thumbnailUrl,
  playedAt,
  callback
) => {
  const sql = `
      INSERT INTO play_logs (video_id, title, artist, thumbnail_url, last_played_date, play_count)
      VALUES (?, ?, ?, ?, ?, 1)
      ON DUPLICATE KEY UPDATE
        play_count = play_count + 1,
        last_played_date = VALUES(last_played_date),
        title = VALUES(title),
        artist = VALUES(artist),
        thumbnail_url = VALUES(thumbnail_url)
    `;
  db.query(sql, [videoId, title, artist, thumbnailUrl, playedAt], callback);
};

// 로그 조회 (SELECT)
exports.selectPlayLogs = (callback) => {
  const sql = `
    SELECT id, video_id, title, artist, play_count, last_played_date, thumbnail_url
    FROM play_logs
    ORDER BY play_count DESC, last_played_date DESC
    LIMIT 100
  `;
  db.query(sql, callback);
};
