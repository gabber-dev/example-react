import React from 'react';

interface VolumeVisualizerProps {
  agentVolumeBands: number[];
  agentVolume: number;
  userVolume: number;
  remainingSeconds: number | null;
}

const VolumeVisualizer: React.FC<VolumeVisualizerProps> = ({
  agentVolumeBands,
  agentVolume,
  userVolume,
  remainingSeconds,
}) => {
  return (
    <div className="flex flex-col">
      <h4 className="font-fredoka font-semibold text-blue-600 mb-1 text-xs">Volume Bands:</h4>
      <div className="flex space-x-1 h-12 mb-2">
        {agentVolumeBands.map((band, index) => (
          <div
            key={index}
            className="w-1 bg-[#FF5925] self-end"
            style={{ height: `${band * 100}%` }}
          ></div>
        ))}
      </div>
      
      <div className="mb-2">
        <h4 className="font-fredoka font-semibold text-blue-600 mb-1 text-xs">Agent Volume:</h4>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-[#FF5925] h-1.5 rounded-full" 
            style={{ width: `${agentVolume * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-2">
        <h4 className="font-fredoka font-semibold text-blue-600 mb-1 text-xs">User Volume:</h4>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-blue-600 h-1.5 rounded-full" 
            style={{ width: `${userVolume * 100}%` }}
          ></div>
        </div>
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
