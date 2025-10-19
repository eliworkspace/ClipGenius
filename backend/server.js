import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ ClipGenius Backend is Live!");
});

app.post("/", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Missing YouTube URL" });
  }

  // Fake AI response (temporary demo)
  const clips = [
    { title: "🔥 Intense moment", start: 15, end: 30 },
    { title: "💡 Key highlight", start: 45, end: 60 },
    { title: "🏀 Best play", start: 75, end: 90 },
  ];

  res.json({ success: true, url, clips });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
