const { insertPlayLog, selectPlayLogs } = require("../models/playLogModel");

// 로그 저장
exports.savePlayLog = (req, res) => {
  console.log("req ===> ", req.body);
  const { videoId, title, artist, lastPlayedDate } = req.body;
  if (!videoId || !title || !artist) {
    return res
      .status(400)
      .json({ error: "videoId, title, artist는 필수입니다." });
  }
  // playedAt이 없으면 현재 시간 사용
  const playedAtValue = lastPlayedDate || new Date();

  insertPlayLog(videoId, title, artist, playedAtValue, (err, result) => {
    if (err) {
      console.error("DB insert error:", err);
      return res.status(500).json({ error: "DB 저장 실패" });
    }
    res.status(201).json({ message: "로그 저장 성공", id: result.insertId });
  });
};

// 로그 조회
exports.getMusicRank = (req, res) => {
  selectPlayLogs((err, results) => {
    if (err) {
      console.error("DB select error:", err);
      return res.status(500).json({ error: "DB 조회 실패" });
    }
    res.json(results);
  });
};
