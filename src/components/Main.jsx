import WeatherCard from './WeatherCard';
import { defaultClothingItems } from '../utils/constants';
import ItemCard from './ItemCard';
import '../blocks/main.css';
function Main({ weatherData, handleCardClick }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData}></WeatherCard>
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F} °F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            /*.filter((item) => {
              return item.weather === weatherData.type;
            })*/
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
