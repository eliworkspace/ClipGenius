import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setClips([]);

    try {
      const response = await fetch("https://clipgenius-1-ddsz.onrender.com/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to generate clips");

      setClips(data.clips);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, textAlign: "center", fontFamily: "Arial" }}>
      <h1>🎬 ClipGenius</h1>
      <p>Paste a YouTube URL below and generate automatic 15-second clips.</p>

      <input
        type="text"
        placeholder="Enter YouTube link..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "60%", padding: 10, fontSize: 16 }}
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          marginLeft: 10,
          padding: "10px 20px",
          fontSize: 16,
          background: "#0070f3",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Clips"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {clips.length > 0 && (
        <div style={{ marginTop: 20, textAlign: "left", display: "inline-block" }}>
          <h2>Generated Clips:</h2>
          <ul>
            {clips.map((clip, index) => (
              <li key={index}>
                {clip.title} — Start: {clip.start}s, End: {clip.end}s
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
