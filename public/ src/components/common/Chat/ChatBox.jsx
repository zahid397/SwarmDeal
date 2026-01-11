import React, { useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Loader2 } from 'lucide-react';

const ChatBox = () => {
  const { messages, sendMessage, isLoading } = useChat();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="chat-card">
      <div className="chat-header">
        <h3>AI Assistant</h3>
        <div className="status-indicator">
          <span className="dot"></span> Online
        </div>
      </div>
      
      <div className="chat-body">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}
        
        {isLoading && (
          <div className="loading-state">
            <Loader2 className="spin" size={16} /> AI is negotiating...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
};
export default ChatBox;
