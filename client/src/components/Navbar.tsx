'use client';

// ✅ FIX: Absolute Path Imports
import { useAuth } from '@/context/AuthContext';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function Navbar() {
  const { isConnected } = useAccount();
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { isAuthenticated, login, logout, user } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900/50 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer">
        SwarmDeal 🐝
      </h1>
      <div className="flex gap-4">
        {!isConnected ? (
          <button 
            onClick={() => connect()} 
            className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            Connect Wallet
          </button>
        ) : !isAuthenticated ? (
          <button 
            onClick={login} 
            className="px-5 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/20"
          >
            Sign In
          </button>
        ) : (
          <div className="flex items-center gap-4 bg-gray-800 px-4 py-1.5 rounded-full border border-gray-700">
            <span className="text-sm text-gray-300 font-mono">
              {user?.username || `${user?.walletAddress?.slice(0,6)}...`}
            </span>
            <button 
              onClick={logout} 
              className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-wide"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
