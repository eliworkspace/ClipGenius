import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateClips = async () => {
    if (!url) return alert("Please paste a YouTube URL");

    setLoading(true);
    try {
      const response = await fetch(
        "https://clipgenius-1-ddsz.onrender.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        }
      );

      if (!response.ok) throw new Error("Backend error");

      const data = await response.json();
      setClips(data.clips);
    } catch (err) {
      console.error(err);
      alert("Error contacting backend");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif", color: "#000" }}>
      <h1>ClipGenius</h1>
      <p>Paste a YouTube URL below and generate clips:</p>

      <input
        style={{ padding: 8, width: "300px" }}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste YouTube URL"
      />

      <button
        style={{ padding: "8px 16px", marginLeft: 8 }}
        onClick={handleGenerateClips}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Clips"}
      </button>

      <div style={{ marginTop: 24 }}>
        {clips.length > 0 && <h2>Generated Clips:</h2>}
        <ul>
          {clips.map((clip, idx) => (
            <li key={idx}>
              {clip.title}: {clip.start}s - {clip.end}s
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
