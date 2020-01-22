import React from 'react';
import SchemeSelector from './SchemeSelector';

function Header(props) {
  return (
    <header>
      <span className="app-title">Scalar</span>
      <SchemeSelector
        colorScheme={props.colorScheme}
        handleChangeColorScheme={props.handleChangeColorScheme}
      />
    </header>
  );
}

export default Header;
