import React from "react";
import BottomPanelButton from "./BottomPanelButton";

export default function LoggedInBottomBtns({ selectedNotes }) {
  const buttonData = [
    {
      className: "save-scale",
      clickHandler: () => console.log("clicky"),
      text: "Save Scale"
    },
    {
      className: "add-to-group",
      clickHandler: () => console.log("clicky"),
      text: "Add To Group"
    }
  ];
  return (
    <>
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
    </>
  );
}
