'use client';
import React, { createContext, useContext, useState } from 'react';
import api from '@/lib/axios';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
const ChatContext = createContext<any>(undefined);
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([{ role: 'ai', content: 'Hi! I am SwarmDeal AI.' }]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedDeal, setSuggestedDeal] = useState<any>(null);
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setIsLoading(true);
    try {
      const { data } = await api.post('/ai/chat', { message: text });
      setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
      if (data.deal) setSuggestedDeal(data.deal);
    } catch { toast.error('AI Error'); } 
    finally { setIsLoading(false); }
  };
  return (
    <ChatContext.Provider value={{ messages, sendMessage, isLoading, suggestedDeal }}>
      {children}
    </ChatContext.Provider>
  );
}
export const useChat = () => useContext(ChatContext);
