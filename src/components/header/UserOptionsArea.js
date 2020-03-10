import React, { useState, useEffect } from "react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";

export default function UserOptionsArea({ loggedIn, handleFormChange, handleSignIn, handleSignOut }) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  return (
    <div className={`user-options-area`}>
      {!loggedIn ? (
        <SignedOut
          setShowModal={setShowModal}
          showModal={showModal}
          handleFormChange={handleFormChange}
          handleSignIn={handleSignIn}
          closeModal={closeModal}
          openModal={openModal}
        />
      ) : (
        <SignedIn handleSignOut={handleSignOut} />
      )}
    </div>
  );
}
