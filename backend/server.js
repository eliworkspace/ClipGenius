// backend/server.js (temporary test - replace with real handler later)
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("✅ Backend test endpoint OK"));

app.post("/generate-clips", (req, res) => {
  // Immediately respond with what we received — used only for debugging connectivity
  console.log("DEBUG: /generate-clips called, body:", req.body);
  res.json({
    debug: true,
    received: req.body,
    clips: [
      { title: "debug clip 1", start: 0, end: 10 },
      { title: "debug clip 2", start: 10, end: 20 }
    ]
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Debug backend running on port ${PORT}`));
