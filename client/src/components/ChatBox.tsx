
'use client';

import React, { createContext, useContext, useState } from 'react';
import api from '@/lib/axios';
import { useAuth } from '@/context/AuthContext'; // ✅ Absolute Path
import toast from 'react-hot-toast';

// ✅ 1. Strong Type Definitions
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

// ✅ 2. The Critical Interface Fix
interface ChatContextType {
messages: Message[];
sendMessage: (text: string) => Promise<void>; // ⚠️ MUST MATCH EXACTLY
isLoading: boolean;
suggestedDeal: Deal | null;
}

// Context Create
const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
const { user, isAuthenticated } = useAuth();

const [messages, setMessages] = useState<Message[]>([
{ role: 'ai', content: 'Hello! I am SwarmDeal AI. What do you want to buy today?' }
]);
const [isLoading, setIsLoading] = useState(false);
const [suggestedDeal, setSuggestedDeal] = useState<Deal | null>(null);

// ✅ 3. Function Implementation
const sendMessage = async (text: string) => {
if (!text.trim()) return;

// Guest Warning  
if (!isAuthenticated && !user) {  
    toast('Chatting as Guest', { icon: '👀' });  
}  

// Update UI immediately  
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

  // AI Response  
  setMessages(prev => [...prev, { role: 'ai', content: data.response }]);  
    
  // Deal Check  
  if (data.deal) {  
    setSuggestedDeal(data.deal);  
    toast.success('AI structured a new deal! 🔥');  
  }  
} catch (error) {  
  console.error(error);  
  toast.error('AI Brain is sleeping (Server Error)');  
  setMessages(prev => [...prev, { role: 'ai', content: "Sorry, server is unreachable." }]);  
} finally {  
  setIsLoading(false);  
}

};

// ✅ 4. Provider Value (Must match Interface)
return (
<ChatContext.Provider
value={{
messages,
sendMessage,
isLoading,
suggestedDeal
}}
>
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
