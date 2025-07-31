import React from 'react';

function ResultDisplay({ result }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Execution Result</h2>
      <pre style={{ background: '#f4f4f4', padding: '10px' }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}

export default ResultDisplay;
