import { useEffect, useState } from 'react';
import '../blocks/app.css';
import Header from './Header';
import Main from './Main';
import { defaultClothingItems } from '../utils/constants';
import ItemModal from './ItemModal';
import { getWeather, filterWeatherData } from '../utils/weatherApi';
import { coordinates, APIkey } from '../utils/constants';
import Footer from './Footer';
import currentTemperatureUnitContext from '../contexts/currentTemperatureUnitContext';
import AddItemModal from './AddItemModal';
import { Routes, Route } from 'react-router-dom';
function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999, C: 999 },
    city: '',
    condition: '',
    isDay: null,
  });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setcurrentTemperatureUnit] = useState('F');
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const handleToggleSwitchChange = () => {
    setcurrentTemperatureUnit(currentTemperatureUnit === 'F' ? 'C' : 'F');
  };

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };
  const closeModal = () => {
    setActiveModal('');
  };
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    setClothingItems([...clothingItems, { name, link: imageUrl, weather }]);
    closeModal();
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);

        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <currentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
          ></Header>
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                ></Main>
              }
            ></Route>
            <Route path="profile" element={<p>Profile</p>}></Route>
          </Routes>

          <Footer></Footer>
        </div>

        <AddItemModal
          onClose={closeModal}
          isOpen={activeModal === 'add-garment'}
          activeModal={activeModal}
          OnAddItemModalSubmit={handleAddItemModalSubmit}
        ></AddItemModal>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeModal}
        ></ItemModal>
      </div>
    </currentTemperatureUnitContext.Provider>
  );
}

export default App;
