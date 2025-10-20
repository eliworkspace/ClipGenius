import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// Test endpoint (optional)
app.get("/", (req, res) => res.send("ClipGenius backend OK"));

// POST endpoint to receive YouTube URL
app.post("/", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  // Placeholder clips (replace with real logic later)
  const clips = [
    { title: "Clip 1", start: 0, end: 15 },
    { title: "Clip 2", start: 16, end: 30 },
    { title: "Clip 3", start: 31, end: 45 }
  ];

  res.json({ url, clips });
});

// Start server
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
