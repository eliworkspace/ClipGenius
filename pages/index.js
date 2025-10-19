import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!url) return alert("Please enter a YouTube URL");
    setLoading(true);
    try {
      const res = await fetch("https://clipgenius-1-ddsz.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setClips(data.clips || []);
    } catch (err) {
      alert("Error connecting to backend");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, color: "black" }}>
      <h1>🎬 ClipGenius — Auto Clip Generator</h1>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste YouTube URL"
        style={{ width: "60%", padding: 10, marginRight: 10 }}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Clips"}
      </button>

      <div style={{ marginTop: 20 }}>
        {clips.map((clip, i) => (
          <div
            key={i}
            style={{
              border: "1px solid gray",
              padding: 10,
              marginBottom: 8,
              borderRadius: 6,
            }}
          >
            <strong>{clip.title}</strong> — {clip.start}s to {clip.end}s
          </div>
        ))}
      </div>
    </div>
  );
}
