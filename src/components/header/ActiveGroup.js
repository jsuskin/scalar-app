import React, { useEffect } from "react";
import ActiveGroupModal from './ActiveGroupModal';

export default function ActiveGroup({ groupName, showGroup, setShowGroup, showGroupModal, setShowGroupModal }) {
  useEffect(() => {
    const handleModalClick = e => {
      const parent = document.querySelectorAll(".group-modal")[0];
      if (showGroupModal && parent && !parent.contains(e.target) && e.target.id !== "active-group-header-display") {
        setShowGroupModal(false);
        setShowGroup(true);
      }
      if(e.target.className === "group-select") {
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
      <ActiveGroupModal showGroupModal={showGroupModal} groupName={groupName} />
    </>
  );
}
