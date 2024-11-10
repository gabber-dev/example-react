import { useSession } from 'gabber-client-react';
import React from 'react';

function VolumeVisualizer() {
  const { agentVolumeBands, userVolumeBands, remainingSeconds } = useSession();
  return (
    <div className="flex flex-col">
      <h4 className="font-fredoka font-semibold text-blue-600 mb-1 text-xs">Volume Bands:</h4>
      <div className="flex space-x-1 h-12 mb-2">
        AI:
        {agentVolumeBands.map((band, index) => (
          <div
            key={index}
            className="w-1 bg-[#FF5925] self-end"
            style={{ height: `${band * 100}%` }}
          ></div>
        ))}
      </div>
      <div className="flex space-x-1 h-12 mb-2">
        User:
        {userVolumeBands.map((band, index) => (
          <div
            key={index}
            className="w-1 bg-[#FF5925] self-end"
            style={{ height: `${band * 100}%` }}
          ></div>
        ))}
      </div>
      
      {remainingSeconds !== null && (
        <div className="mb-2">
          <h4 className="font-fredoka font-semibold text-blue-600 mb-1 text-xs">Remaining Time:</h4>
          <div className={`text-sm font-semibold ${
            remainingSeconds > 10 ? 'text-[#FF5925]' : 'text-red-600'
          }`}>
            {remainingSeconds} seconds
          </div>
        </div>
      )}
    </div>
  );
};

export default VolumeVisualizer;
