import { useEffect, useState } from 'react';
import '../blocks/app.css';
import Header from './Header';
import Main from './Main';
import ModalWithForm from './ModalWithForm';
import ItemModal from './ItemModal';
import { getWeather, filterWeatherData } from '../utils/weatherApi';
import { coordinates, APIkey } from '../utils/constants';
import Footer from './Footer';
function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999 },
    city: '',
  });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
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
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{' '}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Name{' '}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="image Url"
          />
        </label>
        <fieldset className="modal__radio-btns">
          <legend className="modal__legend">Seletc the weather type</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input id="hot" type="radio" className="modal__radio-input" />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input id="warm" type="radio" className="modal__radio-input" />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input id="cold" type="radio" className="modal__radio-input" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeModal}
      ></ItemModal>
      <Footer></Footer>
    </div>
  );
}

export default App;
