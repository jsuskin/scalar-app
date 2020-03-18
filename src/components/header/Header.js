import React from "react";
import SchemeSelector from "./SchemeSelector";
import UserOptionsArea from "./UserOptionsArea";

function Header({
  loggedIn,
  username,
  colorScheme,
  handleTitleClick,
  handleChangeColorScheme,
  handleFormChange,
  handleSignIn,
  handleRegister,
  handleSignOut
}) {
  return (
    <header>
      <span className='app-title' onClick={handleTitleClick}>Scalar</span>
      <div className='header-options'>
        <UserOptionsArea
          loggedIn={loggedIn}
          username={username}
          handleFormChange={handleFormChange}
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
