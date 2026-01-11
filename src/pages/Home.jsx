import React from 'react';
import ChatBox from '../components/Chat/ChatBox';
import DealCard from '../components/Deal/DealCard';

const Home = () => {
  return (
    <div className="home-layout" style={{ 
      display: 'grid', 
      gridTemplateColumns: '1.2fr 1fr', 
      gap: '4rem', 
      padding: '2rem', 
      maxWidth: '1280px', 
      margin: '0 auto',
      alignItems: 'center',
      minHeight: 'calc(100vh - 80px)'
    }}>
      
      {/* Left: Hero & Deal */}
      <div className="hero-content">
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          Group Buying, <br/>
          <span style={{ color: '#6366f1', background: 'none', WebkitBackgroundClip: 'unset' }}>Supercharged.</span>
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#94a3b8', marginBottom: '2rem', maxWidth: '500px' }}>
          Join forces with others to negotiate unbeatable bulk discounts. 
          Secured by Smart Contracts, Optimized by AI.
        </p>
        
        {/* Deal Card Appears Here */}
        <DealCard />
      </div>

      {/* Right: AI Chat */}
      <div className="chat-section">
        <ChatBox />
      </div>
    </div>
  );
};
export default Home;
