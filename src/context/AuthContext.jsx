import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check valid session on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me')
        .then(res => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async () => {
    if (!window.ethereum) return toast.error("Please install MetaMask!");
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      const message = `Login to SwarmDeal\nTimestamp: ${Date.now()}`;
      const signature = await signer.signMessage(message);

      const { data } = await api.post('/auth/login', {
        walletAddress: address,
        signature,
        message
      });

      localStorage.setItem('token', data.token);
      setUser(data.user);
      toast.success("Wallet Connected! 🔗");
    } catch (error) {
      console.error(error);
      toast.error("Login Failed");
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success("Disconnected");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
