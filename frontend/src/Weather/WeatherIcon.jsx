import React from 'react';

const WeatherIcon = ({ iconCode }) => {
  // Function to map weather condition codes to corresponding icon URLs
  const getIconUrl = (code) => {
    return `https://openweathermap.org/img/wn/${code}.png`;
  };

  return (
    <img
      src={getIconUrl(iconCode)}
      alt="Weather Icon"
      style={{ width: 50, height: 50 }}
    />
  );
};

export default WeatherIcon;
