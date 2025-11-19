'use client';
import React, { useState } from 'react';
import { getVznTextReply, getVznImageReply } from '../../lib/vznApi'; // keep your existing path if different

export default function VznChat() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState<string | null>(null);

  const handleSend = async () => {
    const r = await getVznTextReply(message);
    setReply(r ?? 'No reply');
  };

  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 12 }}>
      <h3>Vzn Chat</h3>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask AI..." />
      <button onClick={handleSend}>Send</button>
      {reply && <pre style={{ marginTop: 8 }}>{reply}</pre>}
    </div>
  );
}
