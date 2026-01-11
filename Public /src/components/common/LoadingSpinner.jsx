import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ text = 'Loading...', fullscreen = false }) => {
  return (
    <div className={`spinner-container ${fullscreen ? 'fullscreen' : ''}`}>
      <Loader2 className="spinner" size={28} />
      <span className="spinner-text">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
