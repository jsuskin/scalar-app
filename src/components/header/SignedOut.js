import React from 'react';
import SignInModal from "./SignInModal";

export default function SignedOut({showModal, setShowModal, handleFormChange, handleSignIn, closeModal, openModal}) {
  return (
    <>
      <span onClick={() => setShowModal(!showModal)} id='sign-in-btn'>
        Sign In
      </span>
      <SignInModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleFormChange={handleFormChange}
        handleSignIn={handleSignIn}
        closeModal={closeModal}
        openModal={openModal}
      />
    </>
  );
}
