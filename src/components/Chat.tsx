import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'gabber-client-react';
import VolumeVisualizer from './VolumeVisualizer';
import StatusPanel from './StatusPanel';
import MessagePanel from './MessagePanel';

interface ChatProps {
  onConnect: () => void;
}

const Chat: React.FC<ChatProps> = ({ onConnect }) => {
  const {
    connectionState,
    messages,
    microphoneEnabled,
    agentVolumeBands,
    agentState,
    transcription,
    setMicrophoneEnabled,
    sendChatMessage,
    startAudio,
    agentVolume,
    userVolume,
    remainingSeconds,
  } = useSession();

  const [inputMessage, setInputMessage] = useState('');
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    if (connectionState === 'connected') {
      startAudio();
    }
  }, [connectionState]);

  useEffect(() => {
    if (remainingSeconds !== null && remainingSeconds === 1) {
      setIsTimedOut(true);
    }
  }, [remainingSeconds]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendChatMessage({ text: inputMessage });
      setInputMessage('');
    }
  };

  if (connectionState === 'not_connected') {
    return (
      <div className="chat-container">
        <button onClick={onConnect} className="connect-button">
          Connect to Chat
        </button>
      </div>
    );
  }

  if (isTimedOut) {
    return (
      <div className="timeout-container">
        <h3>Out of Time</h3>
        <button onClick={() => window.location.reload()} className="reset-button">
          Reset Session
        </button>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <h3 className="chat-title">Gabber AI Chat</h3>
      <div className="chat-content">
        <div className="left-panel">
          <StatusPanel 
            connectionState={connectionState}
            agentState={agentState}
            microphoneEnabled={microphoneEnabled}
            setMicrophoneEnabled={setMicrophoneEnabled}
          />
          <VolumeVisualizer 
            agentVolumeBands={agentVolumeBands}
            agentVolume={agentVolume}
            userVolume={userVolume}
            remainingSeconds={remainingSeconds}
          />
        </div>
        <MessagePanel 
          messages={messages}
          transcription={transcription}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;