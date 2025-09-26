import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import '../blocks/itemCard.css';
import likeIcon from '../assets/like.svg';

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
    console.log(`img liked`);
    console.log(isLiked);
    e.stopPropagation(); // Prevent click from propagating to card
    onCardLike({ id: item._id, isLiked });
  };

  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? 'card__like-btn_active' : ''
  }`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {currentUser && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          aria-label={isLiked ? 'Unlike' : 'Like'}
          type="button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={isLiked ? 'black' : 'none'}
            stroke="black"
            strokeWidth="2"
            style={{ display: 'block' }}
          >
            <path d="M10 18s-7-5.3-7-10.2A4.8 4.8 0 0 1 10 3.5a4.8 4.8 0 0 1 7 4.3C17 12.7 10 18 10 18z" />
          </svg>
        </button>
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
