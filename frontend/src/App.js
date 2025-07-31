// File: src/App.js
import React, { useState, useEffect } from 'react';
import ApiKeyForm from './components/ApiKeyForm';
import ActorSelector from './components/ActorSelector';
import DynamicForm from './components/DynamicForm';
import ResultDisplay from './components/ResultDisplay';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorMessage from './components/ErrorMessage';
import { fetchActors, fetchActorSchema } from './services/apifyService';
import './App.css';

function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('apifyApiKey') || '');
  const [state, setState] = useState({
    actors: [],
    selectedActor: null,
    schema: null,
    result: null,
    loading: false,
    error: null
  });

  // Clear sensitive data when API key changes
  useEffect(() => {
    if (!apiKey) {
      setState(prev => ({
        ...prev,
        actors: [],
        selectedActor: null,
        schema: null,
        result: null
      }));
    }
  }, [apiKey]);

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('apifyApiKey', apiKey);
    } else {
      localStorage.removeItem('apifyApiKey');
    }
  }, [apiKey]);

  const handleActorsLoaded = async (actors) => {
    setState(prev => ({ ...prev, actors, error: null }));
  };

  const handleSelectActor = async (actorId) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const schema = await fetchActorSchema(apiKey, actorId);
      setState(prev => ({
        ...prev,
        selectedActor: actorId,
        schema,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: `Failed to load actor schema: ${error && error.message ? error.message : String(error)}`
      }));
    }
  };

  const handleResult = (result) => {
    setState(prev => ({ ...prev, result, error: null }));
  };

  const handleError = (error) => {
    let errorMsg = 'An unknown error occurred';
    if (error) {
      if (typeof error === 'string') errorMsg = error;
      else if (error.message) errorMsg = error.message;
      else errorMsg = String(error);
    }
    setState(prev => ({ ...prev, error: errorMsg }));
  };

  const handleReset = () => {
    setApiKey('');
    setState({
      actors: [],
      selectedActor: null,
      schema: null,
      result: null,
      loading: false,
      error: null
    });
  };

  const { actors, selectedActor, schema, result, loading, error } = state;

  return (
    <div className="App">
      <header className="app-header">
        <h1>Apify Actor Runner</h1>
        {apiKey && (
          <button 
            onClick={handleReset}
            className="reset-button"
            aria-label="Reset application"
          >
            Reset
          </button>
        )}
      </header>

      <main className="app-content">
        {error && <ErrorMessage message={error} onDismiss={() => setState(prev => ({ ...prev, error: null }))} />}
        {loading && <LoadingIndicator />}

        {!apiKey ? (
          <ApiKeyForm onSubmit={setApiKey} onError={handleError} />
        ) : (
          <>
            <ActorSelector
              apiKey={apiKey}
              onActorsLoaded={handleActorsLoaded}
              onSelectActor={handleSelectActor}
              onError={handleError}
            />
            {selectedActor && schema && (
              <DynamicForm
                schema={schema}
                actorId={selectedActor}
                apiKey={apiKey}
                onResult={handleResult}
                onError={handleError}
              />
            )}
          </>
        )}

        {result && (
          <ResultDisplay 
            result={result}
            onClose={() => setState(prev => ({ ...prev, result: null }))}
          />
        )}
      </main>
    </div>
  );
}

export default App;