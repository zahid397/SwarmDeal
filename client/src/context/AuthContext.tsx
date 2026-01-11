'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAccount, useSignMessage, useDisconnect } from 'wagmi';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
const AuthContext = createContext<any>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) {
      setToken(stored);
      api.get('/auth/me').then(res => setUser(res.data.user)).catch(() => {
        localStorage.removeItem('token'); setToken(null);
      });
    }
  }, []);
  const login = async () => {
    if (!isConnected) return toast.error('Connect Wallet');
    try {
      const message = `Login SwarmDeal ${Date.now()}`;
      const signature = await signMessageAsync({ message });
      const { data } = await api.post('/auth/login', { walletAddress: address, signature, message });
      setToken(data.token); setUser(data.user); localStorage.setItem('token', data.token);
      toast.success('Logged in!');
    } catch { toast.error('Login Failed'); }
  };
  return (
    <AuthContext.Provider value={{ token, user, login, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
