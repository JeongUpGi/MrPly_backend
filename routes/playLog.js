const express = require("express");
const router = express.Router();
const {
  savePlayLog,
  getMusicRank,
} = require("../controllers/playLogController");

router.post("/save-play-log", savePlayLog); // 로그 저장
router.get("/get-music-rank", getMusicRank); // 로그 조회

module.exports = router;
