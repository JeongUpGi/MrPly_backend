const { insertWinLog, selectWinLogs } = require("../models/winLogModel");

// 우승 로그 저장
exports.saveWinLog = (req, res) => {
  console.log("req.body:", req.body);
  const { videoId, title, artist, thumbnailUrl } = req.body;
  if (!videoId || !title || !artist || !thumbnailUrl) {
    return res
      .status(400)
      .json({ error: "videoId, title, artist, thumbnailUrl는 필수입니다." });
  }

  const winAtValue = new Date().toISOString().slice(0, 19).replace("T", " ");

  insertWinLog(
    videoId,
    title,
    artist,
    thumbnailUrl,
    winAtValue,
    (err, result) => {
      if (err) {
        console.error("DB insert error:", err);
        return res.status(500).json({ error: "DB 저장 실패" });
      }
      res
        .status(201)
        .json({ message: "우승 로그 저장 성공", id: result.insertId });
    }
  );
};

// 우승 로그 조회
exports.selectTotalWinner = (req, res) => {
  selectWinLogs((err, results) => {
    if (err) {
      console.error("DB select error:", err);
      return res.status(500).json({ error: "DB 조회 실패" });
    }
    if (!results || results.length === 0) {
      return res.json({});
    }
    res.json(results[0]);
  });
};
