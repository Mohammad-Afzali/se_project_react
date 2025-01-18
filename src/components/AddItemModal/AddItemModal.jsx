import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({
  closeActiveModal,
  isOpen,
  activeModal,
  isLoading,
  handleAddItem,
}) {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const [weatherInput, setWeatherInput] = useState("");
  const handleWeatherChange = (e) => {
    setWeatherInput(e.target.value);
  };

  const resetInputs = () => {
    setName("");
    setWeatherInput("");
    setUrl("");
  };

  useEffect(() => {
    if (isOpen) {
      resetInputs();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItem({ name, weather: weatherInput, imageUrl: link, resetInputs });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      onClose={closeActiveModal}
      isOpened={activeModal === "add-garment"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image {""}
        <input
          type="text"
          className="modal__input"
          id="imageURL"
          placeholder="Image URL"
          value={link}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type </legend>
        <label htmlFor="hot" className="modal__label modal__label__type_radio">
          <input
            id="hot"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            value={"hot"}
            onChange={handleWeatherChange}
            checked={weatherInput === "hot"}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label__type_radio">
          <input
            id="warm"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            value={"warm"}
            onChange={handleWeatherChange}
            checked={weatherInput === "warm"}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label__type_radio">
          <input
            id="cold"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            value={"cold"}
            onChange={handleWeatherChange}
            checked={weatherInput === "cold"}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;