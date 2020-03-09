import React from 'react';
import SchemeSelector from './SchemeSelector';
import UserOptionsArea from './UserOptionsArea';

function Header({ colorScheme, handleChangeColorScheme, handleFormChange, handleSignIn }) {
  return (
    <header>
      <span className="app-title">Scalar</span>
      <div className="header-options">
        <UserOptionsArea handleFormChange={handleFormChange} handleSignIn={handleSignIn} />
        <SchemeSelector
          colorScheme={colorScheme}
          handleChangeColorScheme={handleChangeColorScheme}
        />
      </div>
    </header>
  );
}

export default Header;
