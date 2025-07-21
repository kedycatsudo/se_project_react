import '../blocks/itemModal.css';
function ItemModal({ activeModal, onClose, card }) {
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
          <h2 className="item__modal-caption">{card.name}</h2>
          <p className="item__modal-weather">weather : {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
