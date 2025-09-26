import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import '../blocks/sideBar.css';

// fallback avatar in case user has no avatar
import defaultAvatar from '../assets/avatar.svg';

function SideBar({ editClick, signOutClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <img
          src={currentUser?.avatar || defaultAvatar}
          alt={currentUser?.name || 'Default Avatar'}
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser?.name || 'Your Name'}</p>
      </div>
      <div className="sidebar__btn-container">
        <button onClick={editClick} className="sideBar__btn">
          Change Profile Data
        </button>
        <button onClick={signOutClick} className="sideBar__btn">
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
