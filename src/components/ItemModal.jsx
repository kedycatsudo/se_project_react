import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import '../blocks/itemModal.css';

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser && card.owner === currentUser._id;

  return (
    <div className={`modal ${activeModal === 'preview' && 'modal__open'}`}>
      <div className="item__modal_content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="item__card_close-btn "
        ></button>
        <img src={card.link} alt="card" className="modal__image" />
        <div className="item__modal-footer">
          <div className="item__modal-footer-info">
            <h2 className="item__modal-caption">{card.name}</h2>
            <p className="item__modal-weather">weather : {card.weather}</p>
          </div>
          {isOwn && (
            <button
              onClick={() => onDelete(card._id)}
              className="item__card-delete-btn"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
