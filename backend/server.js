// backend/server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is live and working!");
});

// Main route for generating clips
app.post("/generate-clips", async (req, res) => {
  const { youtubeUrl } = req.body;

  console.log("Received YouTube URL:", youtubeUrl);

  // Mock response — just pretend we generated clips
  const clips = [
    { id: 1, start: 0, end: 15 },
    { id: 2, start: 16, end: 30 },
    { id: 3, start: 31, end: 45 },
  ];

  // Respond with mock data
  res.json({ success: true, clips });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
