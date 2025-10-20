import express from "express";
import cors from "cors";
import ytdl from "ytdl-core";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is running correctly!");
});

app.post("/generate", async (req, res) => {
  try {
    const { youtubeUrl } = req.body;

    if (!youtubeUrl) {
      return res.status(400).json({ error: "YouTube URL is required" });
    }

    // Get video info
    const info = await ytdl.getInfo(youtubeUrl);
    const title = info.videoDetails.title;
    const lengthSeconds = parseInt(info.videoDetails.lengthSeconds, 10);

    // Split into 15-second clips
    const clips = [];
    for (let start = 0; start < lengthSeconds; start += 15) {
      clips.push({
        clip: `Clip ${Math.floor(start / 15) + 1}`,
        start,
        end: Math.min(start + 15, lengthSeconds),
      });
    }

    res.json({ title, clips });
  } catch (error) {
    console.error("❌ Error generating clips:", error);
    res.status(500).json({ error: "Failed to process video" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
