import React, { useState } from "react";
import { getDistance, convertDistance } from "geolib";

function App() {
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState({});
  const [locationOne, setLocationOne] = useState('');
  const [locationTwo, setLocationTwo] = useState('');
  const [distance, setDistance] = useState(null);

  const success = (pos) => {
    const { latitude, longitude, accuracy } = pos.coords;
    alert(
      `Latitude: ${latitude}\nLongitude: ${longitude}\nAccuracy: ${accuracy}`
    );
    setStatus("Located");
    setLocation({ latitude, longitude, accuracy });
  };

  const getGeolocation = () => {
    if (navigator.geolocation) {
      setStatus("Locating…");
      navigator.geolocation.getCurrentPosition(success);
    } else {
      setStatus("Geolocation is not supported by this browser.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "locationOne") {
      setLocationOne(value);
    } else if (name === "locationTwo") {
      setLocationTwo(value);
    }
  };

  const calculateDistance = () => {
    const [lat1, lon1] = locationOne.split(",").map(Number);
    const [lat2, lon2] = locationTwo.split(",").map(Number);
    const dist = getDistance(
      { latitude: lat1, longitude: lon1 },
      { latitude: lat2, longitude: lon2 }
    );
    setDistance(convertDistance(dist, "m"));
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

      <input
        type="text"
        name="locationOne"
        value={locationOne}
        onChange={handleInputChange}
        placeholder="Enter first location"
      />
      <input
        type="text"
        name="locationTwo"
        value={locationTwo}
        onChange={handleInputChange}
        placeholder="Enter second location"
      />

      <button onClick={calculateDistance}>Calculate Distance</button>
      {distance && <p>Distance: {distance} m</p>}
    </div>
  );
}

export default App;
