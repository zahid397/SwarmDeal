import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Wallet, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, login, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">SwarmDeal 🐝</div>
      <div className="nav-actions">
        {user ? (
          <div className="user-badge">
            <span className="address">{user.walletAddress.slice(0,6)}...{user.walletAddress.slice(-4)}</span>
            <button onClick={logout} className="icon-btn" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button onClick={login} className="btn btn-primary">
            <Wallet size={18} /> Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
