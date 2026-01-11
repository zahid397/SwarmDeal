src/components/Chat/ChatBox.jsx
import React, { useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import LoadingSpinner from '../common/LoadingSpinner';

const ChatBox = () => {
const { messages, sendMessage, isLoading } = useChat();
const bottomRef = useRef(null);

useEffect(() => {
bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages, isLoading]);

return (
<div className="chat-container">
<div className="chat-header">
<h3>AI Assistant</h3>
<span className="online-status">● Online</span>
</div>
<div className="chat-messages">
{messages.map((msg, idx) => (
<ChatMessage key={idx} message={msg} />
))}
{isLoading && <div className="loading-indicator"><LoadingSpinner /> Analyzing...</div>}
<div ref={bottomRef} />
</div>
<ChatInput onSend={sendMessage} disabled={isLoading} />
</div>
);
};
export default ChatBox;
