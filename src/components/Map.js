import React from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 80px)',
};

const center = {
  lat: 20.5937,
  lng: 78.9629,
};

const libraries = ['places'];

const Map = ({ fromLocation, toLocation, stops, travelMode, response, directionsCallback, setMap }) => {
  const onLoadMap = map => {
    setMap(map);
  };

  return (
    <LoadScript googleMapsApiKey="Your_Google_Api_key" libraries={libraries}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        onLoad={onLoadMap}
        onUnmount={() => setMap(null)}
        options={{ zoomControl: true }}
      >
        {fromLocation && toLocation && (
          <DirectionsService
            options={{
              origin: fromLocation,
              destination: toLocation,
              waypoints: stops.filter(stop => stop !== '').map(stop => ({ location: stop, stopover: true })),
              travelMode: travelMode
            }}
            callback={directionsCallback}
          />
        )}
        {response && (
          <DirectionsRenderer
            options={{
              directions: response,
              suppressMarkers: true
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
