import SideBar from './SideBar';
import ClothesSection from './ClothesSection';
import '../blocks/profile.css';
function Profile({ onCardClick, clothingItems, onClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar></SideBar>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onClick={onClick}
        ></ClothesSection>
      </section>
    </div>
  );
}
export default Profile;
