import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { useState, useEffect } from "react";

const RegisterModal = ({
  closeActiveModal,
  handleLoginModal,
  isOpen,
  onRegister,
  buttonClass = "modal__submit",
}) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    setIsButtonActive(
      email.trim() !== "" &&
        password.trim() !== "" &&
        name.trim() !== "" &&
        avatar.trim() !== ""
    );
  }, [email, password, name, avatar]);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setAvatar("");
      setPassword("");
      setEmail("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      name="register"
      isButtonDisabled={!isButtonActive}
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
          id="register-email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </label>
      <label  className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="register-password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </label>
      <label  className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          id="register-name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
      </label>
      <label  className="modal__label">
        Avatar URL*
        <input
          type="url"
          className="modal__input modal__input_signup"
          id="register-avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
          autoComplete="url"
        />
      </label>
      <div className="modal__buttons-container">
      
        <button
          type="button"
          className="modal__login-button"
          onClick={handleLoginModal}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
