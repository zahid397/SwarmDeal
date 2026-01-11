'use client';

import { useChat } from '@/context/ChatContext';
import { useState } from 'react';

export default function ChatBox() {
  const { messages, addMessage } = useChat();
  const [input, setInput] = useState('');

  return (
    <div className="bg-gray-800 p-4 rounded">
      <div className="h-40 overflow-y-auto mb-2">
        {messages.map((m, i) => (
          <div key={i} className="text-sm mb-1">{m}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 text-black rounded"
        placeholder="Type message..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addMessage(input);
            setInput('');
          }
        }}
      />
    </div>
  );
}
