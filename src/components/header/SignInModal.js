import React, { useEffect } from "react";

export default function SignInModal({
  showModal,
  handleSignIn,
  handleFormChange,
  closeModal,
  openModal
}) {
  const handleModalClick = e => {
    if (e.target.name && e.target.name.match(/username|password/)) return;

    if (
      (showModal && e.target.id !== "sign-in-form") ||
      (!showModal && e.target.id !== "sign-in-btn")
    ) {
      closeModal();
    } else openModal();
  };

  useEffect(() => {
    window.addEventListener("click", handleModalClick);
  });

  return (
    <div className={`sign-in-modal${showModal ? " show-modal" : ""}`}>
      <form onSubmit={handleSignIn} id='sign-in-form'>
        <input
          type='text'
          id='username'
          name='username'
          placeholder='username'
          onChange={handleFormChange}
        />
        <input
          type='password'
          id='password'
          name='password'
          placeholder='password'
          onChange={handleFormChange}
        />
        <input type='submit' id='log-in-btn' value='Log In' />
        <span>Register an Account</span>
      </form>
    </div>
  );
}
