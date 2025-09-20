import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import '../blocks/sideBar.css';

// fallback avatar in case user has no avatar
import defaultAvatar from '../assets/avatar.svg';

function SideBar() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        src={currentUser?.avatar || defaultAvatar}
        alt={currentUser?.name || 'Default Avatar'}
        className="sidebar__avatar"
      />
      <p className="sidebar__username">{currentUser?.name || 'Your Name'}</p>
    </div>
  );
}

export default SideBar;
