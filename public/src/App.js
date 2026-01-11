import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <Home />
        <Toaster position="bottom-right" />
      </div>
    </AuthProvider>
  );
}

export default App;
