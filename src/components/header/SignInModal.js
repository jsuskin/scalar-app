import React, { useState, useEffect } from "react";
import SignInForm from './SignInForm';
import RegisterForm from './RegisterForm';

export default function SignInModal({
  showModal,
  handleSignIn,
  handleRegister,
  handleFormChange,
  closeModal,
  openModal
}) {
  const [showRegister, setShowRegister] = useState(false);
  const [pwConfirm, setPwConfirm] = useState('');

  const handleModalClick = e => {
    if (!e.target.id.match(/username|password|register|login|sign\-in\-form|sign\-in\-btn/)) {
      closeModal();
      setShowRegister(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleModalClick);
  });

  return (
    <div className={`modal sign-in-modal${showModal ? " show-modal" : ""}`}>
      {
        !showRegister ? (
          <SignInForm
            handleSignIn={handleSignIn}
            handleFormChange={handleFormChange}
            setShowRegister={setShowRegister}
          />
        ) : (
          <RegisterForm
            setShowRegister={setShowRegister}
            handleRegister={handleRegister}
            pwConfirm={pwConfirm}
            setPwConfirm={setPwConfirm}
            handleFormChange={handleFormChange}
          />
        )
      }
    </div>
  );
}
