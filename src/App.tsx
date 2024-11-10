import React, { useCallback, useEffect, useState } from 'react';
import { SessionProvider } from 'gabber-client-react'; // Removed Gabber import due to it not being exported
import { ConnectOptions, Api, Voice } from 'gabber-client-core'; // Added import for ConnectOptions
import Chat from './components/LiveView';

// Gabber LLM
const LLM = "90d72e7d-8ae2-458c-adb9-074a7fe432c7"

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [sessionConnectOpts, setSessionConnectOpts] = useState<ConnectOptions | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [voice, setVoice] = useState<string>("");
  const [voices, setVoices] = useState<Voice[]>([]);

  const initialLoad = useCallback(async () => {
    try {
      if(token) {
        return
      }
      const response = await fetch('http://localhost:4000/token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const tokenResp = await response.json();
      setToken(tokenResp.token);
      const api = new Api(tokenResp.token);
      const voiceResp = await api.getVoices()
      setVoices(voiceResp.values)
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  }, [token]);

  useEffect(() => {
    initialLoad();
  }, [initialLoad]);

  if(!token) {
    return <div>Loading...</div>;
  }

  if(!sessionConnectOpts) {
    return (
      <div className="flex flex-col">
        <label htmlFor="prompt">Prompt</label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <label htmlFor="voice">Voice</label>
        <select
          id="voice"
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
        >
          <option value="">Select a voice</option>
          {voices.map((v) => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
        {voice && prompt && (<button onClick={async () => {
          const connectOpts: ConnectOptions = {
            token,
            sessionConnectOptions: {
              history: [],
              voice_override: voice,
              llm: LLM,
            }
          }
          setSessionConnectOpts(connectOpts)
        }}>Start Chat</button>)}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <SessionProvider connectionOpts={sessionConnectOpts}>
          <Chat  />
        </SessionProvider>
      </div>
    </div>
  );
}

export default App;