import React from 'react';
import { useSession } from 'gabber-client-react';

const MessageList: React.FC = () => {
  const { messages } = useSession();

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`message ${message.agent ? 'agent' : 'user'}`}
        >
          <div className="message-content">
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;