import React from 'react';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/common/ErrorBoundary';
import './styles/global.css';
import './styles/components.css';
import './styles/responsive.css';

function App() {
return (
<ErrorBoundary>
<AuthProvider>
<ChatProvider>
<div className="app">
<Navbar />
<Home />
<Toaster position="bottom-right" toastOptions={{
style: { background: '#334155', color: '#fff' }
}}/>
</div>
</ChatProvider>
</AuthProvider>
</ErrorBoundary>
);
}
export default App;
