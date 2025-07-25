import '../blocks/modalWithForm.css';
function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  activeModal,
  onClose,
}) {
  return (
    <div className={`modal ${isOpen && 'modal__open'}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <form action="" className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
