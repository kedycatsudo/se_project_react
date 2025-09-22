import '../blocks/header.css';
import logo from '../assets/logo.svg';
import avatar from '../assets/avatar.svg';
import '../vendor/fonts.css';
import ToggleSwitch from './ToggleSwitch';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Header({ handleAddClick, weatherData, setActiveModal }) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });
  function renderAvatar() {
    if (currentUser && currentUser.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="header__avatar"
        />
      );
    }
    if (currentUser && currentUser.name) {
      return (
        <div className="header__avatar header__avatar--placeholder">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
      );
    }
    // fallback to a generic placeholder image
    return <img src={avatar} alt="Avatar" className="header__avatar" />;
  }

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="header logo" />
      </Link>
      <p className="header__date-and-loc">
        {currentDate},{weatherData.city || ''}
      </p>
      <ToggleSwitch />

      {currentUser ? (
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            {renderAvatar()}
          </div>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
        </Link>
      ) : (
        <div className="header__auth-controls">
          <button
            className="header__auth-btn"
            onClick={() => setActiveModal('register')}
          >
            Sign up
          </button>
          <button
            className="header__auth-btn"
            onClick={() => setActiveModal('login')}
          >
            Sign in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
