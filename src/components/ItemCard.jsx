import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import '../blocks/itemCard.css';

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked =
    currentUser &&
    item.likes &&
    item.likes.some((id) => id === currentUser._id);

  const handleLike = (e) => {
    e.stopPropagation(); // Prevent click from propagating to card
    onCardLike({ id: item._id, isLiked });
  };

  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? 'card__like-btn_active' : ''
  }`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
      {/* Show like button only if user is logged in */}
      {currentUser && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          aria-label={isLiked ? 'Unlike' : 'Like'}
        >
          ♥
        </button>
      )}
    </li>
  );
}

export default ItemCard;
