import SideBar from './SideBar';
import ClothesSection from './ClothesSection';
import '../blocks/profile.css';

function Profile({
  onCardClick,
  clothingItems,
  onClick,
  onEditProfile,
  onSignOut,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <button className="profile__edit-btn" onClick={onEditProfile}>
          Edit profile
        </button>
        <button className="profile__signout-btn" onClick={onSignOut}>
          Sign out
        </button>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onClick={onClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}
export default Profile;
