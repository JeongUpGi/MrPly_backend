const express = require("express");
const router = express.Router();
const {
  saveWinLog,
  selectTotalWinner,
} = require("../controllers/winLogController");

router.post("/save-win-log", saveWinLog); // 우승 로그 저장
router.get("/get-total-winner", selectTotalWinner); // 우승 로그 조회

module.exports = router;
