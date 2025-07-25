import { useEffect, useState } from 'react';
import '../blocks/app.css';
import Header from './Header';
import Main from './Main';
import ModalWithForm from './ModalWithForm';
import ItemModal from './ItemModal';
import { getWeather, filterWeatherData } from '../utils/weatherApi';
import { coordinates, APIkey } from '../utils/constants';
import Footer from './Footer';
import currentTemperatureUnitContext from '../contexts/currentTemperatureUnitContext';
function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999, C: 999 },
    city: '',
    type: '',
    condition: '',
    isDay: null,
  });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setcurrentTemperatureUnit] = useState('F');

  const handleToggleSwitchChange = () => {
    setcurrentTemperatureUnit(currentTemperatureUnit === 'F' ? 'C' : 'F');
  };
  //validation
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    weather: ``,
  });

  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.peventDefault();
    const errors = [];

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.imageUrl.trim()) errors.imageUrl = 'Image URL is required';
    if (!formData.weather) errors.weather = 'Please select a weather option';
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
      console.log('Submitting:', formData);

      // Reset form + close modal
      setFormData({ name: '', imageUrl: '', weather: '' });
      setFormErrors({});
      closeModal();
    }
  };
  //validation
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
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
          ></Main>
          <Footer></Footer>
        </div>

        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          activeModal={activeModal}
          onClose={closeModal}
          onSubmit={handleSubmit}
          isOpen={activeModal === 'add-garment'}
        >
          <label htmlFor="name" className="modal__label">
            Name{' '}
            <input
              type="text"
              className="modal__input"
              id="name"
              required
              placeholder="Name"
              value={formData.form}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image Url{' '}
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              required
              placeholder="image Url"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>
          <fieldset className="modal__radio-btns">
            <legend className="modal__legend">Select the weather type</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="hot"
                type="radio"
                className="modal__radio-input"
                value={'hot'}
                checked={formData.weather === 'hot'}
                onChange={(e) =>
                  setFormData({ ...formData, weather: e.target.value })
                }
              />
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="warm"
                type="radio"
                className="modal__radio-input"
                value="warm"
                checked={formData.weather === 'warm'}
                onChange={(e) =>
                  setFormData({ ...formData, weather: e.target.value })
                }
              />
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="cold"
                type="radio"
                className="modal__radio-input"
                value="cold"
                checked={formData.weather === 'cold'}
                onChange={(e) =>
                  setFormData({ ...formData, weather: e.target.value })
                }
              />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
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
