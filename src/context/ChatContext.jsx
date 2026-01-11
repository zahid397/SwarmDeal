import React, { createContext, useContext, useState } from 'react';
import { sendChatMessage } from '../api/chat';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am SwarmDeal AI. What deal are you looking for today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedDeal, setSuggestedDeal] = useState(null);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // UI Optimistic Update
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);
    setSuggestedDeal(null);

    try {
      const { data } = await sendChatMessage(
        text,
        user?.walletAddress || 'guest_user',
        messages.slice(-5) // Send history for context
      );

      setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
      
      if (data.deal) {
        setSuggestedDeal(data.deal);
        toast.success("AI found a killer deal! 🔥");
      }
    } catch (error) {
      console.error(error);
      toast.error("AI Brain is offline (Server Error)");
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble connecting to the server." }]);
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

export const useChat = () => useContext(ChatContext);
