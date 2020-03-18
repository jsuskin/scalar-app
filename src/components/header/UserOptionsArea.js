import React, { useState } from "react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";

export default function UserOptionsArea({ loggedIn, username, handleFormChange, handleSignIn, handleRegister, handleSignOut }) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  return (
    <div className="user-options-area">
      {!loggedIn ? (
        <SignedOut
          setShowModal={setShowModal}
          showModal={showModal}
          handleFormChange={handleFormChange}
          handleSignIn={handleSignIn}
          handleRegister={handleRegister}
          closeModal={closeModal}
          openModal={openModal}
        />
      ) : (
        <SignedIn handleSignOut={handleSignOut} username={username} />
      )}
    </div>
  );
}
