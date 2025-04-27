import { useRealtimeSessionEngine } from 'gabber-client-react';

function StatusPanel() {
  const { connectionState, agentState, microphoneEnabled, setMicrophoneEnabled } = useRealtimeSessionEngine();
  return (
    <div className="status-panel">
      <div className="status-item">
        <span className="font-semibold">Connection:</span> {connectionState}
      </div>
      <div className="status-item">
        <span className="font-semibold">Agent State:</span> {agentState}
      </div>
      <button
        onClick={() => setMicrophoneEnabled(!microphoneEnabled)}
        className={`mic-button ${microphoneEnabled ? 'enabled' : ''}`}
      >
        {microphoneEnabled ? 'Disable Mic' : 'Enable Mic'}
      </button>
    </div>
  );
};

export default StatusPanel;
