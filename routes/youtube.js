const express = require("express");
const router = express.Router();
const { getYoutubeAudio } = require("../controllers/youtubeController");

router.get("/get-youtube-audio", getYoutubeAudio);

module.exports = router;
