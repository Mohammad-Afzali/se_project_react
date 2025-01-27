import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "../ModalWithForm/ModalWithForm.css";
import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, onDeleteConfirm }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card?.owner === currentUser?._id;

  const cardDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content_type_preview">
        <button
          className="modal__close_type_white"
          type="button"
          onClick={onClose}
        ></button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className={isOwn ? "modal__footer_own" : "modal__footer"}>
          <div className="modal__left-section">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <div className="modal__right-section">
            {isOwn && (
              <button
                className={cardDeleteButtonClassName}
                type="button"
                onClick={onDeleteConfirm}
              >
                Delete item
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;