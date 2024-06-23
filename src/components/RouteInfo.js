import React from 'react';

const RouteInfo = ({ response, fromLocation, stops, toLocation, travelMode }) => {
  if (!response) return null;

  return (
    <div className="alert alert-info bg-blue-100 text-blue-700 p-4 rounded mb-4">
      <strong>From:</strong> {fromLocation}
      <br />
      <strong>Stops:</strong> {stops.filter(stop => stop !== '').join(', ') || 'No stops'}
      <br />
      <strong>To:</strong> {toLocation}
      <br />
      <strong>{travelMode === 'DRIVING' ? 'Driving' : travelMode === 'WALKING' ? 'Walking' : 'Biking'} distance:</strong> {response.routes[0].legs.map(leg => leg.distance.text).join(' + ')}
      <br />
      <strong>Duration:</strong> {response.routes[0].legs.map(leg => leg.duration.text).join(' + ')}
    </div>
  );
};

export default RouteInfo;
