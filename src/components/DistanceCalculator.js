import React, { useState,  useEffect } from 'react';
import Map from './Map';
import LocationInput from './LocationInput';
import StopsList from './StopsList';
import ModeSelector from './ModeSelector';
import RouteInfo from './RouteInfo';
import { useDebounce } from 'use-debounce';

const DistanceCalculator = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [stops, setStops] = useState(['']);
  const [toLocation, setToLocation] = useState('');
  const [response, setResponse] = useState(null);
  const [map, setMap] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [debouncedFromLocation] = useDebounce(fromLocation, 1000);
  const [debouncedToLocation] = useDebounce(toLocation, 1000);
  const [debouncedStops] = useDebounce(stops, 1500);

  const directionsCallback = (result, status) => {
    if (status === 'OK') {
      setResponse(result);
    } else {
      console.error('Directions request failed due to ' + status);
    }
  };

  const onPlacesChanged = (ref, index) => {
    const places = ref.getPlaces();
    if (places.length > 0) {
      const newStops = [...stops];
      if (index === -1) {
        setFromLocation(places[0].formatted_address);
      } else if (index === -2) {
        setToLocation(places[0].formatted_address);
      } else {
        newStops[index] = places[0].formatted_address;
        setStops(newStops);
      }
    }
  };

  const calcRoute = () => {
    if (!debouncedFromLocation || !debouncedToLocation) {
      alert('Please enter both From and To locations.');
      return;
    }

    const waypoints = debouncedStops
      .filter(stop => stop !== '')
      .map(stop => ({ location: stop, stopover: true }));

    // Call DirectionsService to calculate route
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: debouncedFromLocation,
        destination: debouncedToLocation,
        waypoints: waypoints,
        travelMode: travelMode,
      },
      directionsCallback
    );
  };

  useEffect(() => {
    if (debouncedFromLocation && debouncedToLocation) {
      calcRoute();
    }
  }, [debouncedFromLocation, debouncedStops, debouncedToLocation, travelMode]);

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <div className="md:w-1/2 pr-4 mb-4">
        <h1 className="text-center text-2xl font-bold mb-4">Distance Calculator</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
          <LocationInput
            label="Origin"
            location={fromLocation}
            setLocation={setFromLocation}
            onPlacesChanged={(ref) => onPlacesChanged(ref, -1)}
          />
          <StopsList stops={stops} setStops={setStops} onPlacesChanged={onPlacesChanged} />
          <LocationInput
            label="Destination"
            location={toLocation}
            setLocation={setToLocation}
            onPlacesChanged={(ref) => onPlacesChanged(ref, -2)}
          />
        </div>
        <ModeSelector travelMode={travelMode} setTravelMode={setTravelMode} />
        <div className="form-group mb-4">
          <button className="btn btn-info btn-lg bg-blue-500 text-white p-2 rounded" onClick={calcRoute}>
            Calculate
          </button>
        </div>
        <RouteInfo
          response={response}
          fromLocation={debouncedFromLocation}
          stops={debouncedStops}
          toLocation={debouncedToLocation}
          travelMode={travelMode}
        />
      </div>
      <div className="md:w-1/2 h-96">
        <Map
          fromLocation={debouncedFromLocation}
          toLocation={debouncedToLocation}
          stops={debouncedStops}
          travelMode={travelMode}
          response={response}
          directionsCallback={directionsCallback}
          setMap={setMap}
        />
      </div>
    </div>
  );
};

export default DistanceCalculator;
