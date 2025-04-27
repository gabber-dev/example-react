import React, { useCallback, useEffect, useState } from 'react';
import { RealtimeSessionEngineProvider } from 'gabber-client-react'; // Removed Gabber import due to it not being exported
import { Api, SDKConnectOptionsOneOf1, Voice } from 'gabber-client-core'; // Added import for ConnectOptions
import Chat from './components/LiveView';

const GABBER_LLM = "90d72e7d-8ae2-458c-adb9-074a7fe432c7"

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [sessionConnectOpts, setSessionConnectOpts] = useState<SDKConnectOptionsOneOf1 | null>(null);
  const [prompt, setPrompt] = useState<string>("You are a helpful assistant.");
  const [voice, setVoice] = useState<string>("");
  const [voices, setVoices] = useState<Voice[]>([]);
  const [context, setContext] = useState<string>("");

  const initialLoad = useCallback(async () => {
    try {
      if (token) {
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
      const voiceResp = await api.voice.listVoices()
      setVoices(voiceResp.data.values)
      const contextResp = await api.llm.createContext({
        messages: [
          {
            role: "system",
            content: prompt
          }
        ]
      })
      setContext(contextResp.data.id)
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  }, [prompt, token]);

  useEffect(() => {
    initialLoad();
  }, [initialLoad]);

  if (!token) {
    return <div>Loading...</div>;
  }

  if (!sessionConnectOpts) {
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
          const connectOpts: SDKConnectOptionsOneOf1 = {
            token,
            config: {
              "general": {
                "save_messages": true
              },
              "input": {
                "interruptable": true,
                "parallel_listening": false
              },
              "generative": {
                "llm": GABBER_LLM,
                "voice_override": voice,
                "context": context,
              },
              "output": {
                "stream_transcript": true,
                "speech_synthesis_enabled": true,
                "answer_message": "Hello?"
              }
            },
          }
          setSessionConnectOpts(connectOpts)
        }}>Start Chat</button>)}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <RealtimeSessionEngineProvider connectionOpts={sessionConnectOpts}>
          <Chat />
        </RealtimeSessionEngineProvider>
      </div>
    </div>
  );
}

export default App;