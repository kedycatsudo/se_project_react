import '../blocks/header.css';
import logo from '../assets/logo.svg';
import avatar from '../assets/avatar.svg';
import '../vendor/fonts.css';
import ToggleSwitch from './ToggleSwitch';
import { Link } from 'react-router-dom';

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="header logo" />
      </Link>

      <p className="header__date-and-loc">
        {currentDate},{weatherData.city}
      </p>
      <ToggleSwitch></ToggleSwitch>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </Link>
    </header>
  );
}
export default Header;
