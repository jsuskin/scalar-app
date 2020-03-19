import React, { useState } from "react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";

export default function UserOptionsArea({
  loggedIn,
  username,
  handleFormChange,
  handleSelectGroup,
  handleSelectFavorite,
  handleSignIn,
  handleRegister,
  handleSignOut
}) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  return (
    <div className='user-options-area'>
      {!loggedIn ? (
        <SignedOut
          setShowModal={setShowModal}
          showModal={showModal}
          handleFormChange={handleFormChange}
          handleSignIn={handleSignIn}
          handleRegister={handleRegister}
          closeModal={closeModal}
        />
      ) : (
        <SignedIn
          handleSignOut={handleSignOut}
          username={username}
          handleSelectFavorite={handleSelectFavorite}
          handleSelectGroup={handleSelectGroup}
        />
      )}
    </div>
  );
}
