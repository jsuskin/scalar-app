import React from 'react'

export default function ActiveGroupModal({ showGroupModal, groupName }) {
  return (
    <div className={`modal group-modal${showGroupModal ? " show-modal" : ""}`}>
      <div className="group-selection">
        <span className="group-name active-group">{groupName}</span>
        <hr />
      </div>
    </div>
  );
}
