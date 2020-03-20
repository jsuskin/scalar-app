import React, { useState, useEffect } from 'react';
import { fetchGroup } from '../../utils/HelperMethods';
import { notes } from '../../data';

export default function ActiveGroupModal({ showGroupModal, groupName, groupId, handleSelectFavorite }) {
  const [ scales, setScales ] = useState([]);

  useEffect(() => {
    if(groupId) fetchGroup(groupId, setScales);
  }, [groupId, setScales])

  return (
    <div className={`modal group-modal${showGroupModal ? " show-modal" : ""}`}>
      <div className="group-selection">
        <span className="group-name active-group">{groupName}</span>
        <hr />
        <ul className="group-scale-selections">
          {
            scales.map(scale => {
              const scaleNotes = scale.notes.map(idx => notes[idx]).join(', ');
              return (
                <li key={scale._id} className="group-scale-selection" onClick={() => handleSelectFavorite(scale.name, scale.notes)}>
                  <span>{scale.name}</span>
                  <span>{scaleNotes}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}
