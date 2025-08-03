import { useEffect, useState } from 'react';
import '../blocks/app.css';
import Header from './Header';
import Main from './Main';
import { defaultClothingItems } from '../utils/constants';
import ItemModal from './ItemModal';
import { getWeather, filterWeatherData } from '../utils/weatherApi';
import { coordinates, apiKey } from '../utils/constants';
import Footer from './Footer';
import currentTemperatureUnitContext from '../contexts/CurrentTemperatureUnitContext';
import AddItemModal from './AddItemModal';
import { Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import { getItems } from '../utils/api';
import { postItem } from '../utils/api';
import { deleteItem } from '../utils/api';

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
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [clothingItems, setClothingItems] = useState([]);
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === 'F' ? 'C' : 'F');
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
    postItem({ name, imageUrl, weather })
      .then((newItem) => {
        // Add link property for consistency
        const normalizedItem = {
          ...newItem,
          link: newItem.link || newItem.imageUrl,
        };
        setClothingItems((prevItems) => [...prevItems, normalizedItem]);
        closeModal();
      })
      .catch((error) => {
        console.log(error);
        // Optionally show an error message to the user
      });
  };
  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
        // Optionally show an error message to the user
      });
  };
  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);

        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    getItems()
      .then((data) => {
        const normalized = data.map((item) => ({
          ...item,
          link: item.link || item.imageUrl, // fallback if needed
        }));
        setClothingItems(normalized);
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
                  handleDeleteItem={handleDeleteItem}
                ></Main>
              }
            ></Route>
            <Route
              path="profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onClick={handleAddClick}
                ></Profile>
              }
            ></Route>
          </Routes>

          <Footer></Footer>
        </div>

        <AddItemModal
          onClose={closeModal}
          isOpen={activeModal === 'add-garment'}
          activeModal={activeModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        ></AddItemModal>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeModal}
          onDelete={handleDeleteItem}
        ></ItemModal>
      </div>
    </currentTemperatureUnitContext.Provider>
  );
}

export default App;
