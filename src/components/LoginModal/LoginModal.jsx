import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import "./LoginModal.css";

const LoginModal = ({
  closeActiveModal,
  isOpen,
  onLogIn,
  handleRegisterModal,
  buttonClass = "modal__submit",
  error = null,
}) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    setIsButtonActive(data.email.trim() !== "" && data.password.trim() !== "");
  }, [data.email, data.password]);

  useEffect(() => {
    if (isOpen) {
      setData({ email: "", password: "" });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      return;
    }
    onLogIn({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      error={error}
      name="login"
    >
        
      <button
        className="modal__close"
        type="button"
        onClick={closeActiveModal}
      />
      <label  className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, email: e.target.value }))
          }
          required
          autoComplete="email"
        />
      </label>
      <label  className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, password: e.target.value }))
          }
          required
          autoComplete="current-password"
        />
      </label>
      {error && <div className="modal__error">{error}</div>}
      <div className="modal__buttons-wrapper">
        <button
          type="button"
          className="modal__signup-button"
          onClick={handleRegisterModal}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
   
  );
};

export default LoginModal;