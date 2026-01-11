'use client';

import React, { createContext, useContext, useState } from 'react';
import api from '@/lib/axios';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

// ✅ 1. Type Definition (এটা মিসিং ছিল বা ভুল ছিল)
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
  sendMessage: (text: string) => Promise<void>; // ✅ এই লাইনটা সবচেয়ে জরুরি
  isLoading: boolean;
  suggestedDeal: Deal | null;
}

// Context তৈরি
const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Hello! I am SwarmDeal AI. What do you want to buy today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedDeal, setSuggestedDeal] = useState<Deal | null>(null);

  // ✅ 2. sendMessage Function Implementation
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Optional: Guest restriction warn
    if (!isAuthenticated && !user) {
        toast('You are chatting as Guest', { icon: '👀' });
    }

    // Add User Message immediately
    const newMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, newMsg]);
    setIsLoading(true);
    setSuggestedDeal(null); // Clear previous deal if any

    try {
      // API Call
      const { data } = await api.post('/ai/chat', { 
        message: text, 
        address: user?.walletAddress || 'guest_user',
        context: messages.slice(-5) // Send history for context
      });

      // Add AI Response
      setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
      
      // If deal found, update state
      if (data.deal) {
        setSuggestedDeal(data.deal);
        toast.success('AI found a potential deal! 🔥');
      }
    } catch (error) {
      console.error(error);
      toast.error('AI is taking a nap (Server Error)');
      // Fallback message so user isn't stuck
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

// Hook to use the context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
