import React from "react";
import BottomPanelButton from "./BottomPanelButton";
import LoggedInBottomBtns from "./LoggedInBottomBtns";

function BottomPanelButtons({
  loggedIn,
  selectedNotes,
  handleFillOctaves,
  handleClearFretboard
}) {
  const buttonData = [
    {
      className: "fill-octaves",
      clickHandler: handleFillOctaves,
      text: "Fill Octaves"
    },
    {
      className: "clear-fretboard",
      clickHandler: handleClearFretboard,
      text: "Clear Fretboard"
    }
  ];

  return (
    <div className='bottom-panel-buttons'>
      {buttonData.map(({ className, clickHandler, text }) => (
        <BottomPanelButton
          key={text}
          classNames={`bottom-panel-btn ${className}${
            selectedNotes.length ? " show-bottom-panel-buttons" : ""
          }`}
          handleClick={clickHandler}
          text={text}
        />
      ))}
      {loggedIn ? <LoggedInBottomBtns selectedNotes={selectedNotes} /> : null}
    </div>
  );
}

export default BottomPanelButtons;
