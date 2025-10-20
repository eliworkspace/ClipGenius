// backend/server.js — FINAL VERSION
import express from "express";
import cors from "cors";
import ytdl from "ytdl-core";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => res.send("✅ ClipGenius backend is live!"));

// ✅ Generate Clips route
app.post("/generate-clips", async (req, res) => {
  try {
    const { youtubeUrl } = req.body;

    // Validate YouTube link
    if (!youtubeUrl || !ytdl.validateURL(youtubeUrl)) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    // Fetch video info
    const info = await ytdl.getInfo(youtubeUrl);
    const lengthSeconds = parseInt(info.videoDetails.lengthSeconds, 10);
    const title = info.videoDetails.title;

    // Split into 15-second clips
    const clipDuration = 15;
    const clips = [];
    for (let start = 0; start < lengthSeconds; start += clipDuration) {
      const end = Math.min(start + clipDuration, lengthSeconds);
      clips.push({
        title: `${title} — Clip ${clips.length + 1}`,
        start,
        end,
      });
    }

    res.json({ success: true, clips });
  } catch (error) {
    console.error("Error generating clips:", error);
    res.status(500).json({ error: "Failed to process video" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ ClipGenius backend running on port ${PORT}`));
