import React, { useState } from "react";
import SchemeSelector from "./SchemeSelector";
import UserOptionsArea from "./UserOptionsArea";
import ActiveGroup from "./ActiveGroup";

function Header({
  loggedIn,
  username,
  colorScheme,
  handleTitleClick,
  handleChangeColorScheme,
  handleFormChange,
  handleSelectFavorite,
  handleSignIn,
  handleRegister,
  handleSignOut
}) {
  const [ showGroup, setShowGroup ] = useState(false);
  const [ groupName, setGroupName ] = useState('');

  const handleSelectGroup = name => {
    setShowGroup(true);
    setGroupName(name);
  }
  
  return (
    <header>
      <span className='app-title' onClick={handleTitleClick}>
        Scalar
      </span>
      <ActiveGroup showGroup={showGroup} groupName={groupName} />
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
