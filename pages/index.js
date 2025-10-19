import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BACKEND_URL = "https://clipgenius-1-ddsz.onrender.com"; // your backend URL

  const handleGenerate = async () => {
    if (!url) return alert("Please enter a YouTube URL");
    setLoading(true);
    setError("");
    setClips([]);

    try {
      const response = await fetch(`${BACKEND_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) throw new Error("Failed to fetch clips");
      const data = await response.json();
      setClips(data.clips || []);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>ClipGenius</h1>
      <input
        style={{ padding: 8, width: "80%", marginRight: 8 }}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste YouTube URL"
      />
      <button onClick={handleGenerate} style={{ padding: 8 }}>
        Generate Clips
      </button>

      {loading && <p>Generating clips...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {clips.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h2>Clips:</h2>
          <ul>
            {clips.map((clip, idx) => (
              <li key={idx}>
                {clip.title} — Start: {clip.start}s, End: {clip.end}s
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
