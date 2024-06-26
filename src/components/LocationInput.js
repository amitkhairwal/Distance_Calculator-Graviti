import React, { useRef } from 'react';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ['places'];

const LocationInput = ({ label, location, setLocation, onPlacesChanged }) => {
  const inputRef = useRef(null);
  const searchBoxRef = useRef(null);

  return (
    <div className="form-group">
      <label className="block text-gray-700">{label}:</label>
      <LoadScript googleMapsApiKey="Your_Google_Api_key" libraries={libraries}>
        <StandaloneSearchBox
          onLoad={ref => (searchBoxRef.current = ref)}
          onPlacesChanged={() => onPlacesChanged(searchBoxRef.current)}
        >
          <input
            type="text"
            ref={inputRef}
            className="form-control w-full p-2 border border-gray-300 rounded"
            placeholder={`${label} Location`}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </StandaloneSearchBox>
      </LoadScript>
    </div>
  );
};

export default LocationInput;
