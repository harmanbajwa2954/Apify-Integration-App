import React from 'react';
// import './ErrorMessage.css';

const ErrorMessage = ({ message, onDismiss }) => (
  <div className="error-message" role="alert">
    <span>{message}</span>
    <button onClick={onDismiss} aria-label="Dismiss error">
      &times;
    </button>
  </div>
);

export default ErrorMessage;