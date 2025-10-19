import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');

  return (
    <div style={{ padding: 24, color: 'black' }}>
      <h1>ClipGenius — Coming Soon</h1>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste YouTube URL"
        style={{ marginRight: 8, padding: 4 }}
      />
      <button
  onClick={async () => {
    if (!url) return alert("Paste a YouTube URL first");
    try {
      const res = await fetch("https://clipgenius-1-ddsz.onrender.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      alert("Response from backend: " + JSON.stringify(data));
    } catch (err) {
      alert("Error connecting to backend: " + err.message);
    }
  }}
>
  Generate Clips
</button>
