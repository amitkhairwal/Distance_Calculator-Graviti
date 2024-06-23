import React from 'react';

const ModeSelector = ({ travelMode, setTravelMode }) => {
  return (
    <div className="form-group mb-4 flex justify-between">
      {['DRIVING', 'WALKING', 'BICYCLING'].map(mode => (
        <button
          key={mode}
          className={`btn btn-lg p-2 rounded ${travelMode === mode ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          onClick={() => setTravelMode(mode)}
        >
          {mode.charAt(0) + mode.slice(1).toLowerCase()}
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
