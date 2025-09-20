import React, { useContext } from 'react';
import ItemCard from './ItemCard';
import CurrentUserContext from '../contexts/CurrentUserContext';
import '../blocks/clothesSection.css';

function ClothesSection({ onCardClick, clothingItems, onClick }) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];

  return (
    <div>
      <div className="clothes__section">
        <p>Your Items</p>
        <button onClick={onClick} className="clothes__section-add-btn">
          + Add New
        </button>
      </div>
      <ul className="clothes__section-items">
        {userItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}
export default ClothesSection;
