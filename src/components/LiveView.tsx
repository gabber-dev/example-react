import VolumeVisualizer from './VolumeVisualizer';
import StatusPanel from './StatusPanel';
import MessagePanel from './MessagePanel';

export function LiveView () {
  return (
    <div className="chat-container">
      <h3 className="chat-title">Gabber AI Chat</h3>
      <div className="chat-content">
        <div className="left-panel">
          <StatusPanel />
          <VolumeVisualizer />
        </div>
        <MessagePanel />
      </div>
    </div>
  );
};

export default LiveView;