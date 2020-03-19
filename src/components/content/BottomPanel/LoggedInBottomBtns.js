import React, { useState, useEffect } from "react";
import SaveFavModal from "./SaveFavModal";
import SaveGroupModal from "./SaveGroupModal";
import BottomPanelButton from "./BottomPanelButton";
import { postFav, postScaleToNewGroup, patchScaleToGroup } from "../../../utils/HelperMethods";

export default function LoggedInBottomBtns({ selectedNotes, selectedScale }) {
  const [showNameModal, setShowNameModal] = useState(false);
  const [showGroupNameModal, setShowGroupNameModal] = useState(false);
  const [name, setName] = useState("");

  const closeNameModal = () => setShowNameModal(false);
  const closeGroupModal = () => setShowGroupNameModal(false);

  const buttonData = [
    {
      className: "save-scale",
      clickHandler: () => setShowNameModal(!showNameModal),
      text: "Save Scale"
    },
    {
      className: "add-to-group",
      clickHandler: () => setShowGroupNameModal(!showGroupNameModal),
      text: "Add To Group"
    }
  ];

  const saveScale = e => {
    e.preventDefault();
    postFav(name, selectedNotes);
    setShowNameModal(false);
  };

  const saveGroup = (existing, data) => {
    existing ? patchScaleToGroup(data, selectedNotes, selectedScale) : postScaleToNewGroup(data, selectedNotes, selectedScale);
    setShowGroupNameModal(false);
  };

  // useEffect(() => {
  //   // selectedScale === 'None' ? setName('') : setName(selectedScale)
  //   console.log(selectedScale)
  // }, [])

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
      <SaveFavModal
        saveScale={saveScale}
        name={name}
        setName={setName}
        showModal={showNameModal}
        closeModal={closeNameModal}
      />
      <SaveGroupModal
        saveGroup={saveGroup}
        name={name}
        setName={setName}
        showModal={showGroupNameModal}
        closeModal={closeGroupModal}
      />
    </>
  );
}
