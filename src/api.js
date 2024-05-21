// Function to fetch weather data for a given location (city name or coordinates) from WeatherAPI
export const fetchWeather = async (location) => {
    // API key for accessing WeatherAPI
    const API_KEY = '5bf00a52d4534a7185f213153242005';
    
    // Construct the API URL with the location (city name or coordinates) and API key
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`);
    
    // Check if the response is not OK (e.g., location not found)
    if (!response.ok) {
      // Throw an error if the location is not found
      throw new Error('Location not found');
    }
    
    // Parse the JSON data from the response
    const data = await response.json();
    
    // Return the weather data
    return data;
  };
  