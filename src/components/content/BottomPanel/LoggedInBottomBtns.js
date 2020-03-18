import React, { useState } from "react";
import NameModal from './NameModal';
import BottomPanelButton from "./BottomPanelButton";

export default function LoggedInBottomBtns({ selectedNotes, selectedScale }) {
  const [showNameModal, setShowNameModal] = useState(false);
  const [name, setName] = useState('');
  const closeNameModal = () => setShowNameModal(false);

  const postFav = scaleName => {
    fetch('http://localhost:4000/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'auth-token': localStorage.authToken
      },
      body: JSON.stringify({ name: scaleName, notes: [...selectedNotes] })
    })
  }
  
  const buttonData = [
    {
      className: "save-scale",
      clickHandler: () => setShowNameModal(!showNameModal),
      text: "Save Scale"
    },
    {
      className: "add-to-group",
      clickHandler: () => console.log("clicky"),
      text: "Add To Group"
    }
  ];

  const saveScale = e => {
    e.preventDefault();
    postFav(name);
    setShowNameModal(false);
  };

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
      <NameModal saveScale={saveScale} setName={setName} showModal={showNameModal} closeModal={closeNameModal} />
    </>
  );
}
