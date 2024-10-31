import React from 'react';

interface StatusPanelProps {
  connectionState: string;
  agentState: string;
  microphoneEnabled: boolean;
  setMicrophoneEnabled: (enabled: boolean) => void;
}

const StatusPanel: React.FC<StatusPanelProps> = ({
  connectionState,
  agentState,
  microphoneEnabled,
  setMicrophoneEnabled,
}) => {
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
