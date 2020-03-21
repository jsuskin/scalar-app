import React, { useState } from "react";
import SchemeSelector from "./SchemeSelector";
import UserOptionsArea from "./UserOptionsArea";
import ActiveGroup from "./ActiveGroup";

function Header({
  loggedIn,
  username,
  colorScheme,
  fretMap,
  handleTitleClick,
  handleChangeColorScheme,
  handleFormChange,
  handleSelectFavorite,
  handleSignIn,
  handleRegister,
  handleSignOut
}) {
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState(null);
  const [showGroup, setShowGroup] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const handleSelectGroup = group => {
    setGroupName(group.name);
    setGroupId(group._id);
    setShowGroup(false);
    setShowGroupModal(true);
  };

  return (
    <header>
      <span className='app-title' onClick={handleTitleClick}>
        Scalar
      </span>
      {localStorage.authToken ? (
        <ActiveGroup
          fretMap={fretMap}
          groupName={groupName}
          groupId={groupId}
          showGroup={showGroup}
          setShowGroup={setShowGroup}
          showGroupModal={showGroupModal}
          setShowGroupModal={setShowGroupModal}
          handleSelectFavorite={handleSelectFavorite}
        />
      ) : null}
      <div className='header-options'>
        <UserOptionsArea
          loggedIn={loggedIn}
          username={username}
          handleFormChange={handleFormChange}
          handleSelectFavorite={handleSelectFavorite}
          handleSelectGroup={handleSelectGroup}
          handleSignIn={handleSignIn}
          handleRegister={handleRegister}
          handleSignOut={handleSignOut}
        />
        <SchemeSelector
          colorScheme={colorScheme}
          handleChangeColorScheme={handleChangeColorScheme}
        />
      </div>
    </header>
  );
}

export default Header;
