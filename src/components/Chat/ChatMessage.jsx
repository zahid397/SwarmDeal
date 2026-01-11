import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isAi = message.role === 'ai';
  return (
    <div className={`message-row ${isAi ? 'ai-row' : 'user-row'}`}>
      <div className={`message-bubble ${isAi ? 'ai-bubble' : 'user-bubble'}`}>
        <div className="message-icon">
          {isAi ? <Bot size={16} /> : <User size={16} />}
        </div>
        <p>{message.content}</p>
      </div>
    </div>
  );
};
export default ChatMessage;
