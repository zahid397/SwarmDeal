import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    api.get('/auth/me')
      .then(res => {
        setUser(res.data.user);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null); // ✅ important
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async () => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const message = `Login to SwarmDeal\nTimestamp: ${Date.now()}`;
      const signature = await signer.signMessage(message);

      const { data } = await api.post('/auth/login', {
        walletAddress: address,
        signature,
        message,
      });

      localStorage.setItem('token', data.token);
      setUser(data.user);
      toast.success('Login successful');
    } catch (err) {
      console.error(err);
      toast.error('Wallet login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user, // ✅ useful everywhere
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
};
