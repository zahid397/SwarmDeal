import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Wallet } from 'lucide-react';

const Navbar = () => {
  const { user, login, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1 style={{ margin: 0, color: '#6366f1' }}>SwarmDeal 🐝</h1>
      <div>
        {user ? (
          <button onClick={logout} className="btn" style={{ background: '#ef4444' }}>Logout</button>
        ) : (
          <button onClick={login} className="btn"><Wallet size={16}/> Connect</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
