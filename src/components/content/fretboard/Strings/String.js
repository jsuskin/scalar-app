import React from 'react';
import Fret from "./Fret";

export default function String({
  sIdx,
  stringName,
  openNote,
  selectedFrets,
  selectedKey,
  showScale,
  highlightFretNumbers,
  handleFretClick,
  handleAddFrets,
  addToFretMap
}) {
  return (
    <li className='string-container'>
      <ul id={stringName} className='string'>
        {Array.from(Array(25)).map((f, fIdx) => {
          const fretName = `${stringName}-fret-${fIdx}`;

          return (
            <Fret
              highlightFret={highlightFretNumbers.includes(fIdx)}
              key={`${sIdx}-${fIdx}`}
              openNote={openNote}
              fretName={fretName}
              fIdx={fIdx}
              sIdx={sIdx}
              selected={selectedFrets.includes(fretName)}
              showScale={showScale}
              selectedKey={selectedKey}
              handleFretClick={handleFretClick}
              handleAddFrets={handleAddFrets}
              addToFretMap={addToFretMap}
            />
          );
        })}
      </ul>
    </li>
  );
}
