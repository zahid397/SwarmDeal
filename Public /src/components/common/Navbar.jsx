import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { truncateAddress } from '../../utils/helpers';
import { Wallet, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, login, logout, loading } = useAuth();

  const walletAddress =
    user?.walletAddress || user?.address || user?.wallet || '';

  return (
    <nav className="navbar">
      <div className="logo">
        SwarmDeal <span role="img">🐝</span>
      </div>

      <div className="nav-actions">
        {user ? (
          <div className="user-info">
            <span className="address">
              {truncateAddress(walletAddress)}
            </span>

            <button
              onClick={logout}
              className="btn btn-danger"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={login}
            className="btn btn-primary"
            disabled={loading}
          >
            <Wallet size={18} />
            {loading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
