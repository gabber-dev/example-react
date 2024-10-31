import React, { useState } from 'react';
import { SessionProvider } from 'gabber-client-react'; // Removed Gabber import due to it not being exported
import Chat from './components/Chat';

function App() {
  const [connectionOpts, setConnectionOpts] = useState<Record<string, unknown> | null>(null); // Adjusted typing to match the expected type
  
  const handleConnect = async () => {
    try {

      // const response = await fetch('https://localhost:3000/token', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      setConnectionOpts({
        token: '',
        sessionConnectOptions: {
          // Add required session connect options here
          persona_id: '',
          scenario_id: '',
          voice_id: '',
        }
      });
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <SessionProvider connectionOpts={connectionOpts as any}>
          <Chat onConnect={handleConnect} />
        </SessionProvider>
      </div>
    </div>
  );
}

export default App;