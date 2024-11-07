import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, handleDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close"></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        {card?.owner === currentUser?._id && (
            <button
              type="button"
              className="item-modal__delete-btn"
              onClick={handleDeleteClick}
            >
              Delete Item
            </button>
          )}
      </div>
    </div>
  );
}

export default ItemModal;
