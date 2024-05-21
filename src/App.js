import React, { useState } from 'react';
import WeatherInput from './WeatherInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { fetchWeather } from './api';
import { Button } from 'react-bootstrap';

// This is the main App component where we handle the weather data fetching and displaying
function App() {
  // State hook to store the weather data
  const [weather, setWeather] = useState(null);
  // State hook to store any error messages
  const [error, setError] = useState(null);

  // Function to handle when the city name is changed
  const handleCityChange = async (city) => {
    try {
      // Fetch the weather data for the given city
      const data = await fetchWeather(city);
      // Update the weather state with the fetched data
      setWeather(data);
      // Clear any previous error messages
      setError(null);
    } catch (err) {
      // If there's an error (e.g., city not found), update the error state
      setError(err.message);
      // Clear the weather state since the fetch failed
      setWeather(null);
    }
  };

  // Function to handle the "Use My Location" button click
  const handleLocationClick = () => {
    // Check if the browser supports Geolocation
    if (navigator.geolocation) {
      // Request the user's current position
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Fetch the weather data for the user's current location
            const data = await fetchWeather(`${latitude},${longitude}`);
            // Update the weather state with the fetched data
            setWeather(data);
            // Clear any previous error messages
            setError(null);
          } catch (err) {
            // If there's an error (e.g., location not found), update the error state
            setError(err.message);
            // Clear the weather state since the fetch failed
            setWeather(null);
          }
        },
        (err) => {
          // Handle the error if unable to retrieve location
          setError('Unable to retrieve location');
        }
      );
    } else {
      // If Geolocation is not supported by the browser, set an error message
      setError('Geolocation is not supported by this browser');
    }
  };

  return (
    <div className="App">
      {/* Main heading of the app */}
      <h1>Weather App</h1>
      {/* Component to input the city name, passing handleCityChange as a prop */}
      <WeatherInput onCityChange={handleCityChange} />
      {/* Button to get weather data based on the user's current location */}
      <Button variant="secondary" onClick={handleLocationClick} className="mt-3">
        Use My Location
      </Button>
      {/* Display an error message if there's any */}
      {error && <p className="text-danger mt-3">{error}</p>}
      {/* Display the weather information if available */}
      {weather && (
        <div className="weather-info mt-3">
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
        </div>
      )}
    </div>
  );
}

export default App;
