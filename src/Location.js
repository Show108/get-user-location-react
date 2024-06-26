import React, { useState } from 'react';

const GeolocationDemo = () => {
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState({});

  const success = (pos) => {
    const { latitude, longitude, accuracy } = pos.coords;
    alert(`Latitude: ${latitude}\nLongitude: ${longitude}\nAccuracy: ${accuracy}`);
    setStatus('Located');
    setLocation({ latitude, longitude, accuracy });
  };

  const getGeolocation = () => {
    if (navigator.geolocation) {
      setStatus('Locating…');
      navigator.geolocation.getCurrentPosition(success);
    } else {
      setStatus('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <div id="demo">{status}</div>
      <button onClick={getGeolocation}>Get Geolocation</button>
      {location.latitude && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Accuracy: {location.accuracy}</p>
        </div>
      )}
    </div>
  );
};

export default GeolocationDemo;
