// backend/server.js
import express from "express";
import cors from "cors";
import ytdl from "ytdl-core";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));
app.use(cors());

// Test endpoint
app.get("/", (req, res) => res.send("ClipGenius backend OK"));

// POST endpoint to generate clips dynamically
app.post("/", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  try {
    const info = await ytdl.getInfo(url);
    const lengthSeconds = parseInt(info.videoDetails.lengthSeconds);

    // Divide video into 15-second clips (or less if video is short)
    const clips = [];
    for (let start = 0; start < lengthSeconds; start += 15) {
      const end = Math.min(start + 15, lengthSeconds);
      clips.push({ title: `Clip ${clips.length + 1}`, start, end });
    }

    res.json({ url, clips });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get video info" });
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
