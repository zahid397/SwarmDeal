import React from 'react';
import ChatBox from '../components/Chat/ChatBox';
import DealCard from '../components/Deal/DealCard';

const Home = () => {
  return (
    <div className="page-layout">
      <div className="hero-section">
        <h1 className="hero-title">
          Group Buying <br />
          <span className="highlight">Reimagined.</span>
        </h1>

        <p className="hero-subtitle">
          Join forces, unlock bulk discounts, and let AI negotiate for you.
        </p>

        <DealCard />
      </div>

      <ChatBox />
    </div>
  );
};

export default Home;
