'use client';
import { useState } from 'react';
import { useChat } from '@/context/ChatContext';
import { Send } from 'lucide-react';
export default function ChatBox() {
  const { messages, sendMessage, isLoading } = useChat();
  const [input, setInput] = useState('');
  return (
    <div className="bg-gray-800 h-[500px] flex flex-col rounded-xl p-4">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span className={`inline-block p-2 rounded ${m.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>{m.content}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 bg-gray-700 p-2 rounded text-white" />
        <button onClick={() => { sendMessage(input); setInput(''); }} disabled={isLoading}><Send /></button>
      </div>
    </div>
  );
}
