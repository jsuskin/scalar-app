import React, { useState, useEffect } from "react";
import ModalFretboard from "./ModalFretboard";
import { fetchGroup } from "../../../utils/HelperMethods";
import { notes } from "../../../data";

export default function ActiveGroupModal({
  fretMap,
  showGroupModal,
  groupName,
  groupId,
  handleSelectFavorite
}) {
  const [scales, setScales] = useState([]);
  const [viewMult, setViewMult] = useState(0);

  useEffect(() => {
    if (groupId) fetchGroup(groupId, setScales);
    setViewMult(0);
  }, [groupId, setScales]);

  return (
    <div className={`modal group-modal${showGroupModal ? " show-modal" : ""}`}>
      <div className='group-selection'>
        <span className='group-name active-group'>{groupName}</span>
        <hr />
        <ul className='group-scale-selections'>
          {scales
            .slice(viewMult * 3, (viewMult + 1) * 3)
            .map((scale, scaleIdx) => {
              const scaleNotes = scale.notes.map(idx => notes[idx]).join(", ");
              return (
                <li
                  key={scale._id}
                  className='group-scale-selection'
                  onClick={() => handleSelectFavorite(scale.name, scale.notes)}
                >
                  <ScaleDetails scaleIdx={scaleIdx} innerText={scale.name} />
                  <ModalFretboard fretMap={fretMap} scaleNotes={scale.notes} />
                  <ScaleDetails scaleIdx={scaleIdx} innerText={scaleNotes} />
                </li>
              );
            })}
        </ul>
        <div className='group-nav'>
          <ViewMore
            condL={viewMult}
            condR={0}
            mod={-1}
            setViewMult={setViewMult}
            viewMult={viewMult}
          />
          <ViewMore
            condL={scales.length}
            condR={(viewMult + 1) * 3}
            mod={1}
            setViewMult={setViewMult}
            viewMult={viewMult}
          />
        </div>
      </div>
    </div>
  );
}

function ScaleDetails({ scaleIdx, innerText }) {
  return (
    <span className={scaleIdx % 2 === 0 ? "float-left" : "float-right"}>
      {innerText}
    </span>
  );
}

function ViewMore({ condL, condR, mod, setViewMult, viewMult }) {
  return (
    <span
      className={`view-more-groups${condL <= condR ? " disabled" : ""}`}
      onClick={() => {
        if (condL > condR) setViewMult(viewMult + mod);
      }}
    >
      {mod > 0 ? "►" : "◄"}
    </span>
  );
}
