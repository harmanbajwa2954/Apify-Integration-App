import React, { useState } from 'react';
import { runActor } from '../services/apifyService';

function DynamicForm({ schema, actorId, apiKey, onResult }) {
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e, key, type) => {
    const value = type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await runActor(apiKey, actorId, formData);
      onResult(res.run || res);
    } catch (err) {
      onResult({ error: err.message || 'Run failed' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Actor Input Form</h2>
      {Object.entries(schema.properties || {}).map(([key, prop]) => (
        <div key={key} style={{ marginBottom: '10px' }}>
          <label>{key}:</label><br />
          <input
            type={prop.type === 'number' ? 'number' : 'text'}
            required={schema.required?.includes(key)}
            onChange={(e) => handleChange(e, key, prop.type)}
          />
        </div>
      ))}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Running...' : 'Run Actor'}
      </button>
    </form>
  );
}

export default DynamicForm;
