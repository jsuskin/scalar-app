import React, { useState } from "react";
import Favorites from "./Favorites";
import Groups from "./Groups";

export default function SignedIn({ username, handleSignOut }) {
  const [ showFavs, setShowFavs ] = useState(false);
  const [ showGroups, setShowGroups ] = useState(false);

  return (
    <>
      <span onClick={() => setShowFavs(!showFavs)} id='favorites'>
        Favorites
      </span>
      <Favorites show={showFavs} closeModal={() => setShowFavs(false)} />

      <span onClick={() => setShowGroups(!showGroups)} id='groups'>
        Groups
      </span>
      <Groups show={showGroups} closeModal={() => setShowGroups(false)} />

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
