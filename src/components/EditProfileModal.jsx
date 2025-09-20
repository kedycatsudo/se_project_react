import React, { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import '../blocks/editProfileModal.css'; // Make sure you have this, or use your modal.css

function EditProfileModal({ isOpen, onClose, onUpdateProfile, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  // Fill form with current user when modal opens
  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || '');
      setAvatar(currentUser.avatar || '');
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateProfile({ name, avatar });
  }

  return (
    <div className={`modal ${isOpen ? 'modal__open' : ''}`}>
      <div className="modal__content">
        <button
          className="modal__close-btn"
          type="button"
          onClick={onClose}
          aria-label="Close"
        />
        <h2 className="modal__title">Edit Profile</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Name
            <input
              className="modal__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={2}
              maxLength={30}
              required
            />
          </label>
          <label className="modal__label">
            Avatar URL
            <input
              className="modal__input"
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              required
            />
          </label>
          <button
            className="modal__submit-btn"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
