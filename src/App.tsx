import React, { useState } from 'react';
import { SessionProvider } from 'gabber-client-react';
import Chat from './components/Chat';

function App() {
  const [connectionOpts, setConnectionOpts] = useState<any>(null);
  
  const handleConnect = async () => {
    try {
      // Fetch token from your local server: https://github.com/gabber-dev/example-server/tree/main
      //const response = await fetch('http://localhost:3000/token');

      
      //const data = await response.json();
      //const token = data.token;
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0IjoiOTI4YTc4NjgtODRlYi00ZjRhLTliNmMtOWNhMzZkZjVjNDJhIiwiaHVtYW4iOiIxMjMiLCJpYXQiOjE3MzAzMzQwODcsImV4cCI6MTczMDQyMDQ4N30.cJ-TGvzqUHCi4Vdm1Z8mK9HRqN2hPR8kaZWt2vLDOAY'

      setConnectionOpts({
        token,
        roomName: "demo-room",
        participantName: "demo-user"
      });
    } catch (error) {
      console.error('Error fetching token:', error);
      // You might want to add some error handling UI here
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <SessionProvider connectionOpts={connectionOpts}>
          <Chat onConnect={handleConnect} />
        </SessionProvider>
      </div>
    </div>
  );
}

export default App;