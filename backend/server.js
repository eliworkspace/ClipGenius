import express from "express";
import cors from "cors";
import ytdl from "ytdl-core";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));
app.use(cors());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("ClipGenius backend is running ✅");
});

// ✅ Generate clips from a YouTube URL
app.post("/generate", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || !ytdl.validateURL(url)) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;
    const lengthSeconds = parseInt(info.videoDetails.lengthSeconds);

    // Break the video into 15-second clips
    const clips = [];
    for (let start = 0; start < lengthSeconds; start += 15) {
      clips.push({
        title: `${title} - Clip ${Math.floor(start / 15) + 1}`,
        start,
        end: Math.min(start + 15, lengthSeconds),
      });
    }

    res.json({ success: true, url, clips });
  } catch (error) {
    console.error("Error generating clips:", error);
    res.status(500).json({ error: "Failed to process video" });
  }
});

app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
