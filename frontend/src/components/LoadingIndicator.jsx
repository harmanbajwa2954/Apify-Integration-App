import React from 'react';
// import './LoadingIndicator.css';

const LoadingIndicator = () => (
  <div className="loading-indicator" aria-live="polite">
    <div className="spinner"></div>
    <span>Loading...</span>
  </div>
);

export default LoadingIndicator;