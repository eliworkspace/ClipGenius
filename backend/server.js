import { useState } from 'react';
export default function Home() {
  const [url, setUrl] = useState('');
  return (
    <div style={{ padding: 24, color: 'black' }}>
      <h1>ClipGenius — Coming Soon</h1>
      <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Paste YouTube URL"/>
      <button onClick={()=>alert('Backend not yet implemented')}>Generate Clips</button>
    </div>
  );
}
Add backend server.js
