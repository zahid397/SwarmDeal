'use client';

import React, { createContext, useContext, useState } from 'react';
import api from '@/lib/axios';
// ✅ FIX: Relative path বাদ দিয়ে Absolute Path (@/...) দেওয়া হলো
import { useAuth } from '@/context/AuthContext'; 
import toast from 'react-hot-toast';

// Type Definitions
interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface Deal {
  productName: string;
  price: number;
  targetMembers: number;
  category?: string;
  originalPrice?: number;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  suggestedDeal: Deal | null;
}

// Context Creation
const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Hello! I am SwarmDeal AI. What do you want to buy today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedDeal, setSuggestedDeal] = useState<Deal | null>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Optional: Warn if guest
    if (!isAuthenticated && !user) {
        toast('You are chatting as Guest', { icon: '👀' });
    }

    // Add User Message
    const newMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, newMsg]);
    setIsLoading(true);
    setSuggestedDeal(null); 

    try {
      // API Call
      const { data } = await api.post('/ai/chat', { 
        message: text, 
        address: user?.walletAddress || 'guest_user',
        context: messages.slice(-5) 
      });

      // Add AI Response
      setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
      
      // Handle Deal
      if (data.deal) {
        setSuggestedDeal(data.deal);
        toast.success('AI found a potential deal! 🔥');
      }
    } catch (error) {
      console.error(error);
      toast.error('AI is taking a nap (Server Error)');
      setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I can't connect to the server right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isLoading, suggestedDeal }}>
      {children}
    </ChatContext.Provider>
  );
}

// Hook
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
