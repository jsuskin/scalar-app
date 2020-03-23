import React, { useState } from "react";
import Favorites from "../Favorites/Favorites";
import Groups from "../Groups/Groups";

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
      <span>
        <span
          onClick={() => setShowFavs(!showFavs)}
          id='favorites'
          className='user-option'
        >
          Favorites
        </span>
      </span>
      <Favorites
        show={showFavs}
        closeModal={() => setShowFavs(false)}
        handleSelectFavorite={handleSelectFavorite}
      />

      <span>
        <span
          onClick={() => setShowGroups(!showGroups)}
          id='groups'
          className='user-option'
        >
          Groups
        </span>
      </span>
      <Groups
        showGroups={showGroups}
        setShowGroups={setShowGroups}
        handleSelectGroup={handleSelectGroup}
        closeModal={() => setShowGroups(false)}
      />

      <span>
        <span
          onClick={handleSignOut}
          id='sign-out-btn'
          className='user-option'
          title={`Signed in as ${username}`}
        >
          Sign Out
        </span>
      </span>
    </>
  );
}
