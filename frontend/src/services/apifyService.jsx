export const fetchActors = async (apiKey) => {
  const response = await fetch('http://localhost:5000/actors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ apiKey }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch actors');
  }

  return response.json();
};

export const fetchActorSchema = async (apiKey, actorId) => {
  const response = await fetch('http://localhost:5000/actor-schema', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ apiKey, actorId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch actor schema');
  }

  return response.json();
};

export const runActor = async (apiKey, actorId, input) => {
  const response = await fetch('http://localhost:5000/run-actor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ apiKey, actorId, input }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to run actor');
  }

  return response.json();
};