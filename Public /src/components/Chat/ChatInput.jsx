import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ask AI (e.g. MacBook for 5 people)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        className="chat-input"
      />

      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="send-btn"
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default ChatInput;
