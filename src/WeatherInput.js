import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import './App.css'; // Import custom CSS

// This component is for the input form where the user can enter a city name
function WeatherInput({ onCityChange }) {
  // State hook to store the city name entered by the user
  const [city, setCity] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (city) { // Check if the user has entered a city name
      onCityChange(city); // Pass the city name to the parent component
      setCity(''); // Clear the input field
    }
  };

  return (
    <Container className="container mt-5">
      {/* Form for entering the city name */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="cityName" className="form-group">
          <Form.Label>Enter City Name</Form.Label>
          <Form.Control
            type="text"
            value={city} // Bind the input field to the city state
            onChange={(e) => setCity(e.target.value)} // Update the city state when the input changes
            placeholder="Enter city name"
            className="form-control"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn-primary">
          Get Weather
        </Button>
      </Form>
    </Container>
  );
}

export default WeatherInput;
