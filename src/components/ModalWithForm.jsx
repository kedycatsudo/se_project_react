import '../blocks/modalWithForm.css';
function ModalWithForm({
  children,
  buttonText,
  onSubmit,
  title,
  isOpen,
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
        <form onSubmit={onSubmit} action="" className="modal__form">
          {children}
          <button onSubmit={onSubmit} type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
