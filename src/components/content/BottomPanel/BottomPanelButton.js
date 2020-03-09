import React from 'react';

function BottomPanelButton({classNames, handleClick, text}) {
  return (
    <button
      className={classNames}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default BottomPanelButton;
