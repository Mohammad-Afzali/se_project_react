import "./DeleteModal.css";
import close from "../../assets/close-gray.svg";

export default function DeleteModal({
  item,
  isOpened,
  handleCloseClick,
  handleDeleteItem,
  handleDeleteClose,
}) {
  const deleteCard = () => {
    handleDeleteItem(item);
  };

  return (
    <div className={`modal ${isOpened && "modal_opened"}`}>
      <div className="modal__container modal__content_type_delete modal__content">
        <button className="modal__close" type="button" onClick={handleCloseClick}>
        </button>
        <p className="modal__delete_question">
          Are you sure you want to delete this item?
          <br /> This action is irreversible.
        </p>

        <button type="button" className="modal__confirm" onClick={deleteCard}>
          Yes, delete item
        </button>
        <button
          type="button"
          className="modal__cancel"
          onClick={handleCloseClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}