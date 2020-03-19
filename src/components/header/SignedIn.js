import React, { useState } from "react";
import Favorites from "./Favorites";
import Groups from "./Groups";

export default function SignedIn({
  username,
  handleSelectGroup,
  handleSignOut,
  handleSelectFavorite
}) {
  const [showFavs, setShowFavs] = useState(false);
  const [showGroups, setShowGroups] = useState(false);

  return (
    <>
      <span onClick={() => setShowFavs(!showFavs)} id='favorites'
      className="user-option">
        Favorites
      </span>
      <Favorites
        show={showFavs}
        closeModal={() => setShowFavs(false)}
        handleSelectFavorite={handleSelectFavorite}
      />

      <span onClick={() => setShowGroups(!showGroups)} id='groups'
      className="user-option">
        Groups
      </span>
      <Groups showGroups={showGroups} setShowGroups={setShowGroups} handleSelectGroup={handleSelectGroup} closeModal={() => setShowGroups(false)} />

      <span
        onClick={handleSignOut}
        id='sign-out-btn'
        className="user-option"
        title={`Signed in as ${username}`}
      >
        Sign Out
      </span>
    </>
  );
}
