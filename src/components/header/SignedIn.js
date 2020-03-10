import React from 'react';
import SignInModal from "./SignInModal";

export default function SignedIn({handleSignOut}) {
  return (
    <>
      <span onClick={() => console.log('favorites')} id='favorites'>
        Favorites
      </span>
      <span onClick={() => console.log('groups')} id='groups'>
        Groups
      </span>
      <span onClick={handleSignOut} id='sign-out-btn'>
        Sign Out
      </span>
    </>
  );
}
