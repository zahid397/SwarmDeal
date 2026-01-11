'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import { Send, Bot, User, Loader2 } from 'lucide-react';

export default function ChatBox() {
  const { messages, sendMessage, isLoading } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
      {/* Header */}
      <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center gap-3">
        <div className="p-2 bg-purple-600 rounded-full">
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-white">SwarmDeal AI</h3>
          <p className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Online
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
        {messages.map((m: any, i: number) => (
          <div 
            key={i} 
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-2xl flex items-start gap-3 shadow-md ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
              }`}
            >
              <div className="mt-1 shrink-0">
                {m.role === 'ai' ? <Bot size={18} /> : <User size={18} />}
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 p-3 rounded-2xl rounded-tl-none border border-gray-700 flex items-center gap-2 text-gray-400 text-sm">
              <Bot size={18} />
              <Loader2 size={16} className="animate-spin" />
              <span>Analyzing market deals...</span>
            </div>
          </div>
        )}
        
        {/* Invisible element for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center gap-2 bg-gray-900 p-2 rounded-lg border border-gray-700 focus-within:border-blue-500 transition-colors">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white px-2 py-1 focus:outline-none placeholder-gray-500"
            placeholder="Ask AI to find a deal (e.g., 'MacBook Pro for 5 people')..."
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`p-2 rounded-lg transition-all ${
              input.trim() && !isLoading 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' 
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          AI uses Gemini Pro to negotiate & structure group deals.
        </p>
      </div>
    </div>
  );
}
