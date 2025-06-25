const ytdl = require("ytdl-core");

exports.getYoutubeAudio = async (req, res) => {
  const videoId = req.query.videoId;

  if (!videoId) {
    return res.status(400).json({ error: "YouTube videoId is required" });
  }

  try {
    const info = await ytdl.getInfo(videoId, {});

    const audioFormats = ytdl.filterFormats(info.formats, "audioonly");
    let audioFormat = null;
    const mp4AudioFormats = audioFormats.filter(
      (format) =>
        format.container === "mp4" || format.mimeType.includes("audio/mp4")
    );
    if (mp4AudioFormats.length > 0) {
      audioFormat = ytdl.chooseFormat(mp4AudioFormats, {
        quality: "highestaudio",
      });
    }
    if (!audioFormat) {
      audioFormat = ytdl.chooseFormat(audioFormats, {
        quality: "highestaudio",
      });
    }
    if (!audioFormat) {
      console.error(`No suitable audio format found for videoId: ${videoId}`);
      return res
        .status(404)
        .json({ error: "No suitable audio format found for this video" });
    }
    res.json({
      audioUrl: audioFormat.url,
      title: info.videoDetails.title,
      author: info.videoDetails.author.name,
      thumbnailUrl:
        info.videoDetails.thumbnails.length > 0
          ? info.videoDetails.thumbnails.sort((a, b) => b.width - a.width)[0]
              .url
          : "",
    });
  } catch (error) {
    console.error("Error extracting audio:", error);
    res.status(500).json({ error: "Failed to extract audio URL" });
  }
};
