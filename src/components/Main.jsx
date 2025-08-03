import WeatherCard from './WeatherCard';
import ItemCard from './ItemCard';
import '../blocks/main.css';
import { useContext } from 'react';
import currentTemperatureUnitContext from '../contexts/currentTemperatureUnitContext.jsx';
function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData}></WeatherCard>
      <section className="cards">
        <p className="cards__text">
          Today is
          {currentTemperatureUnit === `F`
            ? weatherData.temp.F
            : weatherData.temp.C}
          °{currentTemperatureUnit} You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                ></ItemCard>
              );
            })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
