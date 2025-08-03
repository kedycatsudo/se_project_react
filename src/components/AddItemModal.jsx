import { useState } from 'react';
import '../blocks/AddItemModal.css';
import ModalWithForm from './ModalWithForm';
export default function AddItemModal({
  onAddItemModalSubmit,
  onClose,
  activeModal,
}) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [weather, setWeather] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!name.trim()) errors.name = 'Name is required';
    if (!imageUrl.trim()) errors.imageUrl = 'Image URL is required';
    if (!weather) errors.weather = 'Please select a weather option';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    OnAddItemModalSubmit({ name, imageUrl, weather });
    // Reset form + close modal
    setName('');
    setImageUrl('');
    setWeather('');
    setFormErrors({});
  };
  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      activeModal={activeModal}
      onSubmit={handleSubmit}
      onClose={onClose}
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
          value={name}
          onChange={handleNameChange}
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
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            value={'hot'}
            checked={weather === 'hot'}
            onChange={handleWeatherChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            checked={weather === 'warm'}
            onChange={handleWeatherChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            checked={weather === 'cold'}
            onChange={handleWeatherChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
