import avatar from '../assets/avatar.svg';
import '../blocks/sideBar.css';
function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Default Avatar" className="sidebar__avatar" />
      <p className="sidebar__username">asdasdasdasdasd</p>
    </div>
  );
}
export default SideBar;
