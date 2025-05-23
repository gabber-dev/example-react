import { useRealtimeSessionEngine } from 'gabber-client-react';
import { useState } from 'react';


export function MessagePanel() {
  const { messages, transcription, sendChatMessage } = useRealtimeSessionEngine();
  const [inputMessage, setInputMessage] = useState('');

  return (
    <div className="w-1/2 pl-2 border-l border-gray-200 flex flex-col">
      <h4 className="font-fredoka font-semibold text-blue-600 mb-1 text-xs">Messages:</h4>
      <div className="flex-grow overflow-y-auto bg-gray-50 p-1 rounded h-[280px]">
        <ul className="space-y-1">
          {messages.map((msg, index) => (
            <li key={index} className={`text-xs ${msg.agent ? 'text-blue-600' : 'text-gray-700'}`}>
              {msg.agent ? 'Agent: ' : 'You: '}{msg.text}
            </li>
          ))}
          {transcription.text && (
            <li className="text-xs text-gray-500 italic">Transcription: {transcription.text}</li>
          )}
        </ul>
      </div>
      
      <div className="p-2 border-t border-gray-200">
        <div className="flex">
          <form onSubmit={(e) => {
            e.preventDefault();
            sendChatMessage({ text: inputMessage });
            setInputMessage('');
          }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow border-2 border-blue-600 rounded-l px-2 py-1 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Type a message..."
            />
            <button
              formAction='submit'
              className="bg-[#FF5925] text-white px-2 py-1 rounded-r font-fredoka font-semibold text-xs hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagePanel;
