import React from 'react';
import UserAccessOptions from './UserAccessOptions';
import SchemeSelector from './SchemeSelector';

function Header(props) {
  return (
    <header>
      <span className="app-title">Scalar</span>
      <UserAccessOptions
        loggedIn={props.loggedIn}
        handleLogIn={props.handleLogIn}
        handleLogOut={props.handleLogOut}
      />
      <SchemeSelector
        colorScheme={props.colorScheme}
        handleChangeColorScheme={props.handleChangeColorScheme}
      />
    </header>
  );
}

export default Header;
