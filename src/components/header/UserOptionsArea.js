import React, { useState } from "react";
import SignInModal from "./SignInModal";

export default function UserOptionsArea({ handleFormChange, handleSignIn }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={`user-options-area`}>
      <span onClick={() => setShowModal(!showModal)}>Sign In</span>
      <SignInModal
        showModal={showModal}
        handleFormChange={handleFormChange}
        handleSignIn={handleSignIn}
      />
    </div>
  );
}
