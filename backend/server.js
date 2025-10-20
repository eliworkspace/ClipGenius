import express from "express";
import cors from "cors";
import ytdl from "ytdl-core";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));
app.use(cors());

// Test endpoint to make sure backend is live
app.get("/", (req, res) => {
  res.send("ClipGenius backend OK");
});

// Endpoint to generate clips from YouTube URL
app.post("/generate", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "No URL provided" });

    // Validate YouTube URL
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    // Get video info
    const info = await ytdl.getInfo(url);
    const durationSeconds = parseInt(info.videoDetails.lengthSeconds);

    // Example: split video into 15-second clips
    const clips = [];
    for (let start = 0; start < durationSeconds; start += 15) {
      let end = start + 15;
      if (end > durationSeconds) end = durationSeconds;
      clips.push({ title: `Clip ${clips.length + 1}`, start, end });
    }

    res.json({ url, clips });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process video" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
