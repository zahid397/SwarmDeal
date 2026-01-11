'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ChatContextType = {
  messages: string[];
  addMessage: (msg: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<string[]>([]);

  const addMessage = (msg: string) =>
    setMessages((prev) => [...prev, msg]);

  return (
    <ChatContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used inside ChatProvider');
  return ctx;
}
