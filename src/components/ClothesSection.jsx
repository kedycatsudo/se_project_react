import React, { useContext } from 'react';
import ItemCard from './ItemCard';
import CurrentUserContext from '../contexts/CurrentUserContext';
import '../blocks/clothesSection.css';

function ClothesSection({ onCardClick, clothingItems, onClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];

  return (
    <div>
      <div className="clothes__section">
        <p className="clothes_section_p">Your Items</p>
        <button onClick={onClick} className="clothes__section-add-btn">
          + Add New
        </button>
      </div>
      <ul className="clothes__section-items">
        {userItems.map((item) => (
          <ItemCard
            onCardLike={onCardLike}
            onCardClick={onCardClick}
            key={item._id}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
}
export default ClothesSection;
