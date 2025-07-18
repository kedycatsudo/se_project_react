import { weatherOptions } from '../utils/constants.js';
import '../blocks/weatherCard.css';
function WeatherCard({ weatherData }) {
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
      <p className="weather-card__temp">{weatherData.temp.F}°F</p>
      <img
        src={weatherOptionUrl}
        alt={weatherOptionAlt}
        className="weather-card__img"
      />
    </section>
  );
}
export default WeatherCard;
