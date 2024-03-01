import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/routers";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
function App() {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: 'e40986643efbc254f6bd9da91248f2a6',
    lat: '48.137154',
    lon: '11.576124',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });
  return (
   <>
    <ReactWeather
    isLoading={isLoading}
    errorMessage={errorMessage}
    data={data}
    lang="en"
    locationLabel="Munich"
    unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
    showForecast
  />
  <RouterProvider router={router} />;
  </> 
  )
}

export default App;
