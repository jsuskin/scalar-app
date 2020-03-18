import React, { useState } from "react";
import Favorites from "./Favorites";

export default function SignedIn({ username, handleSignOut }) {
  const [ showFavs, setShowFavs ] = useState(false);

  return (
    <>
      <span onClick={() => setShowFavs(!showFavs)} id='favorites'>
        Favorites
      </span>
      <Favorites show={showFavs} closeModal={() => setShowFavs(false)} />
      <span onClick={() => console.log("groups")} id='groups'>
        Groups
      </span>
      <span
        onClick={handleSignOut}
        id='sign-out-btn'
        title={`Signed in as ${username}`}
      >
        Sign Out
      </span>
    </>
  );
}
