import React from 'react';
import SchemeSelector from './SchemeSelector';
import UserOptionsArea from './UserOptionsArea';

function Header({ loggedIn, colorScheme, handleChangeColorScheme, handleFormChange, handleSignIn, handleSignOut }) {
  return (
    <header>
      <span className="app-title">Scalar</span>
      <div className="header-options">
        <UserOptionsArea loggedIn={loggedIn} handleFormChange={handleFormChange} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />
        <SchemeSelector
          colorScheme={colorScheme}
          handleChangeColorScheme={handleChangeColorScheme}
        />
      </div>
    </header>
  );
}

export default Header;
