const db = require("./db");

// 우승 로그 저장
exports.insertWinLog = (
  videoId,
  title,
  artist,
  thumbnailUrl,
  lastWinAt,
  callback
) => {
  const sql = `
      INSERT INTO winner_logs (video_id, title, artist, thumbnail_url, last_win_date, win_count)
      VALUES (?, ?, ?, ?, ?, 1)
      ON DUPLICATE KEY UPDATE
        win_count = win_count + 1,
        last_win_date = VALUES(last_win_date),
        title = VALUES(title),
        artist = VALUES(artist),
        thumbnail_url = VALUES(thumbnail_url)
    `;
  db.query(sql, [videoId, title, artist, thumbnailUrl, lastWinAt], callback);
};

// 우승 로그 조회
exports.selectWinLogs = (callback) => {
  const sql = `
    SELECT id, video_id, title, artist, win_count, last_win_date, thumbnail_url
    FROM winner_logs
    ORDER BY win_count DESC, last_win_date DESC
    LIMIT 1
  `;
  db.query(sql, callback);
};
