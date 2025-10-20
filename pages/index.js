// frontend/pages/index.js
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // <-- paste your Render backend URL here (no trailing slash)
  const BACKEND_URL = "https://clipgenius-1-ddsz.onrender.com";

  const handleGenerate = async () => {
    setMessage("");
    setClips([]);
    if (!url) {
      setMessage("Please paste a YouTube URL");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/generate-clips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ youtubeUrl: url }),
      });

      // attempt to parse body as json or text for helpful error message
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch (e) { data = text; }

      if (!res.ok) {
        // show server status and body
        const serverMsg = typeof data === "string" ? data : (data.error || JSON.stringify(data));
        setMessage(`Server error ${res.status}: ${serverMsg}`);
        console.error("Server non-OK response:", res.status, data);
        return;
      }

      // success
      setClips(data.clips || []);
      if (!data || !data.clips) setMessage("No clips returned from backend.");
    } catch (err) {
      // network / CORS / other
      console.error("Fetch error:", err);
      setMessage("Network error: " + (err.message || String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1>ClipGenius</h1>
      <p>Paste YouTube URL and click Generate</p>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://www.youtube.com/watch?v=..."
        style={{ width: "65%", padding: 8 }}
      />
      <button onClick={handleGenerate} disabled={loading} style={{ marginLeft: 8, padding: "8px 12px" }}>
        {loading ? "Generating..." : "Generate Clips"}
      </button>

      <div style={{ marginTop: 16 }}>
        {message && <div style={{ color: "red", marginBottom: 12 }}>{message}</div>}

        {clips.length > 0 && (
          <div>
            <h3>Clips</h3>
            <ul>
              {clips.map((c, i) => (
                <li key={i}>
                  {c.title ?? `Clip ${i+1}`} — {c.start}s to {c.end}s
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
