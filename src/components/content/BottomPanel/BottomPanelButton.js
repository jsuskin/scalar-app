import React from 'react';

function BottomPanelButton(props) {
  return (
    <button
      className={props.classNames}
      onClick={props.handleClick}
    >
      {props.text}
    </button>
  );
}

export default BottomPanelButton;
