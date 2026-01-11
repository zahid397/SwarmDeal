import React, { createContext, useContext, useState } from 'react';
import { sendChatMessage } from '../api/chat';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();

  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am SwarmDeal AI. What do you want to buy today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedDeal, setSuggestedDeal] = useState(null);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };

    // ✅ Avoid stale state
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setSuggestedDeal(null);

    try {
      const contextMessages = [...messages, userMessage].slice(-5);

      const { data } = await sendChatMessage(
        text,
        user?.walletAddress || 'guest_user',
        contextMessages
      );

      setMessages(prev => [...prev, { role: 'ai', content: data.response }]);

      if (data.deal) {
        setSuggestedDeal(data.deal);
        toast.success('AI found a deal! 🔥');
      }
    } catch (error) {
      console.error(error);
      toast.error('AI service unavailable');
      setMessages(prev => [
        ...prev,
        { role: 'ai', content: 'Sorry, server error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isLoading, suggestedDeal }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};
