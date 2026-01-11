import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import './styles/global.css';
import './styles/components.css';
import './styles/responsive.css';

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <div className="app-container">
          <Navbar />
          <Home />
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155',
              }
            }}
          />
        </div>
      </ChatProvider>
    </AuthProvider>
  );
}
export default App;
