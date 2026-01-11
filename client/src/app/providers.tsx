'use client';
import { WalletProvider } from '@/context/WalletContext';
import { AuthProvider } from '@/context/AuthContext';
import { ChatProvider } from '@/context/ChatContext';
import { Toaster } from 'react-hot-toast';
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <AuthProvider>
        <ChatProvider>{children}<Toaster /></ChatProvider>
      </AuthProvider>
    </WalletProvider>
  );
}
