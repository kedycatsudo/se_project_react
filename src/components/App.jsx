import { useState } from 'react';
import '../blocks/app.css';
import Header from './Header';
import Main from './Main';
import ModalWithForm from './ModalWithForm';
function App() {
  const [weatherData, setWeatherData] = useState({ type: 'cold' });
  const [activeModal, setActiveModal] = useState('');
  const handleAddClick = () => {
    setActiveModal('add-garment');
  };
  const closeModal = () => {
    setActiveModal('');
  };
  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick}></Header>
        <Main weatherData={weatherData}></Main>
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        handleCloseClick={closeModal}
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
    </div>
  );
}

export default App;
