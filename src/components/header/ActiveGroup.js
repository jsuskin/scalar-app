import React, { useEffect } from "react";
import ActiveGroupModal from "./ActiveGroupModal";

export default function ActiveGroup({
  groupName,
  groupId,
  showGroup,
  setShowGroup,
  showGroupModal,
  setShowGroupModal,
  handleSelectFavorite
}) {
  useEffect(() => {
    const handleModalClick = e => {
      const parent = document.querySelectorAll(".group-modal")[0];
      const scaleSelects = document.querySelectorAll(".group-scale-selections")[0];
      if (
        scaleSelects.contains(e.target) ||
        (showGroupModal &&
          parent &&
          !parent.contains(e.target) &&
          e.target.id !== "active-group-header-display")
      ) {
        setShowGroupModal(false);
        setShowGroup(true);
      }

      if (e.target.className === "group-select") {
        setShowGroupModal(true);
        setShowGroup(false);
      }
    };
    
    window.addEventListener("click", handleModalClick);
  });

  return (
    <>
      <span
        id='active-group-header-display'
        className={`user-option active-group${!showGroup ? " disabled" : ""}`}
        onClick={() => {
          setShowGroupModal(!showGroupModal);
          setShowGroup(!showGroup);
        }}
      >
        {groupName}
      </span>
      <ActiveGroupModal
        showGroupModal={showGroupModal}
        groupName={groupName}
        groupId={groupId}
        handleSelectFavorite={handleSelectFavorite}
      />
    </>
  );
}
