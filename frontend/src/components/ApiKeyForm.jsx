import React, { useState } from 'react';

function ApiKeyForm({ onSubmit }) {
  const [key, setKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key) {
      onSubmit(key);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your Apify API Key:</label><br />
      <input placeholder='API Key..' type="password" value={key} onChange={(e) => setKey(e.target.value)} required />
      <button type="submit">Continue</button>
    </form>
  );
}

export default ApiKeyForm;
