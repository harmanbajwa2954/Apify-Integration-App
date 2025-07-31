import React, { useEffect, useState } from 'react';
import { fetchActors, fetchActorSchema } from '../services/apifyService';

function ActorSelector({ apiKey, onActorsLoaded, onSelectActor }) {
  const [actors, setActors] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const loadActors = async () => {
      try {
        const res = await fetchActors(apiKey);
        const actorList = res.actors || [];
        setActors(actorList);
        onActorsLoaded(actorList);
      } catch (error) {
        alert('Failed to load actors. Check your API key.');
      }
    };
    loadActors();
  }, [apiKey, onActorsLoaded]);

  const handleChange = async (e) => {
    const actorId = e.target.value;
    setSelected(actorId);
    try {
      await fetchActorSchema(apiKey, actorId); // schema is fetched in App.js
      onSelectActor(actorId);
    } catch (err) {
      alert('Failed to fetch schema for selected actor.');
    }
  };

  return (
    <div>
      <label>Select an Actor:</label><br />
      <select value={selected} onChange={handleChange}>
        <option value="">-- Select --</option>
        {actors.map((actor) => (
          <option key={actor.id} value={actor.id}>
            {actor.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ActorSelector;
