import React, { useState, useEffect } from 'react';
import { fetchGroups, selectedNoteIndices } from '../../../../utils/HelperMethods';

export default function SaveGroupModal({ showModal, closeModal, saveGroup }) {
  const [ groups, setGroups ] = useState({ groups: [] });
  const [ showTextInput, setShowTextInput ] = useState(false);
  const [ groupName, setGroupName ] = useState("");
  const [ selectedGroup, setSelectedGroup ] = useState({})

  const handleChange = e => {
    if(!showTextInput) {
      if (e.target.value === "Custom") {
        setShowTextInput(true);
      } else {
        setSelectedGroup(groups.find(group => group.name === e.target.value));
      }
    }
    setGroupName(e.target.value);
  }

  useEffect(() => {
    const handleModalClick = e => {
      const parent = document.querySelectorAll(".group-name-modal")[0];
      
      if (
        parent &&
        !parent.contains(e.target) &&
        !e.target.classList.contains("add-to-group") &&
        e.target.id !== 'select-existing'
      )
        closeModal();
    };
    
    fetchGroups(setGroups).then(() => {
      if(groups.length) {
        setSelectedGroup(groups[0]);
        setGroupName(groups[0].name);
      }
    });

    window.addEventListener("click", handleModalClick);

    return () => window.removeEventListener("click", handleModalClick);
  }, [closeModal]);

  return (
    <div className={`group-name-modal${showModal ? " show-modal" : ""}`}>
      <form onSubmit={e => {
        e.preventDefault();
        !showTextInput ? saveGroup(true, selectedGroup._id) : saveGroup(false, groupName);
        setShowTextInput(false);
      }}>
        <label htmlFor='group-name'>
          {!showTextInput ? "Select" : "Enter"} Group Name
        </label>
        {!showTextInput ? (
          <select onChange={handleChange}>
            {groups.length
              ? [...groups, { name: "Custom", _id: 0 }].map(group => {
                  return <option key={group._id}>{group.name}</option>;
                })
              : null}
          </select>
        ) : (
          <>
            <input type='text' onChange={handleChange} />
            <span id='select-existing' onClick={() => setShowTextInput(false)}>
              Choose An Existing Group
            </span>
          </>
        )}
        <input type='submit' className='submit' value='Save Scale To Group' />
      </form>
    </div>
  );
}
