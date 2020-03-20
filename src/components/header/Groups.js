import React, { useState, useEffect } from "react";
import { fetchGroups } from '../../utils/HelperMethods';

export default function Groups({ showGroups, setShowGroups, closeModal, handleSelectGroup }) {
  const [groups, setGroups] = useState({ groups: [] });

  useEffect(() => {
    const handleModalClick = e => {
      const parent = document.querySelectorAll(".groups-modal")[0];
      if (parent && !parent.contains(e.target) && e.target.id !== "groups")
        closeModal();
    };

    fetchGroups(setGroups);
    window.addEventListener("click", handleModalClick);
  }, [closeModal]);

  return (
    <div
      id='groups-modal'
      className={`modal groups-modal${showGroups ? " show-modal" : ""}`}
    >
      <ul>
        {
          groups.length
            ? groups.map(group => (
                <li key={group._id} className="group-select" onClick={() => {
                  handleSelectGroup(group.name);
                  setShowGroups(false);
                }}>
                  {group.name}
                </li>
              ))
            : null
        }
      </ul>
    </div>
  );
}
