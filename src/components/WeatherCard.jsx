import { weatherOptions } from '../utils/constants.js';
import '../blocks/weatherCard.css';
import { useContext } from 'react';
import currentTemperatureUnitContext from '../contexts/currentTemperatureUnitContext.jsx';
function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOptionUrl = filteredOptions[0]?.url;
  const weatherOptionAlt = filteredOptions[0]?.condition;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === `F`
          ? weatherData.temp.F
          : weatherData.temp.C}
        °{currentTemperatureUnit}
      </p>
      <img
        src={weatherOptionUrl}
        alt={weatherOptionAlt}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
