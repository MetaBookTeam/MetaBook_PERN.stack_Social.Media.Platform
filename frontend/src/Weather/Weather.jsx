 
   import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = 'e40986643efbc254f6bd9da91248f2a6'; // Your OpenWeatherMap API key
  const CITY = 'amman'; // City for which you want to fetch weather data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [CITY, API_KEY]);

  return (
    <Box p={2} boxShadow={3} borderRadius={5} bgcolor="primary.main" color="primary.contrastText">
      <Typography variant="h6" gutterBottom>
        Weather
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        weatherData && (
          <Box textAlign="center">
            <Typography variant="body1" gutterBottom>
              City: {weatherData.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Temperature: {weatherData.main.temp}°C
            </Typography>
            <Typography variant="body1" gutterBottom>
              Humidity: {weatherData.main.humidity}%
            </Typography>
            <Typography variant="body1" gutterBottom>
              Description: {weatherData.weather[0].description}
            </Typography>
          </Box>
        )
      )}
    </Box>
  );
};

export default Weather; 
 





