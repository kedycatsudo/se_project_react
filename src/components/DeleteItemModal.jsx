import React from 'react';
import '../blocks/deleteItemModal.css';

function DeleteItemModal({ isOpen, onClose, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="modal modal__open">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose} aria-label="Close" />
        <h2 className="modal__title">Delete Item</h2>
        <p>
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <div className="modal__actions">
          <button className="delete__modal-submit" onClick={onDelete}>
            Yes, delete item
          </button>
          <button className="modal__cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteItemModal;
