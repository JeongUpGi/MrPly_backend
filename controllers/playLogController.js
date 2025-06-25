const { insertPlayLog, selectPlayLogs } = require("../models/playLogModel");

// 로그 저장
exports.savePlayLog = (req, res) => {
  console.log("req ===> ", req.body);
  const { videoId, title, artist, thumbnailUrl, playedAt } = req.body;
  if (!videoId || !title || !artist || !thumbnailUrl) {
    return res
      .status(400)
      .json({ error: "videoId, title, artist, thumbnailUrl는 필수입니다." });
  }

  const playedAtValue = new Date().toISOString().slice(0, 19).replace("T", " ");

  insertPlayLog(
    videoId,
    title,
    artist,
    thumbnailUrl,
    playedAtValue,
    (err, result) => {
      if (err) {
        console.error("DB insert error:", err);
        return res.status(500).json({ error: "DB 저장 실패" });
      }
      res.status(201).json({ message: "로그 저장 성공", id: result.insertId });
    }
  );
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
