import sunny from '../assets/sunny_weather_card.svg';
import '../blocks/weatherCard.css';
function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75° F</p>
      <img src={sunny} alt="" className="weather-card__img" />
    </section>
  );
}
export default WeatherCard;
