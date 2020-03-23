import React, { Component } from "react";
import FlatsSharpsToggle from "./FlatsSharpsToggle";
import Note from "./Note";
import { notes } from "../../../../data";

function ScaleDisplay({
  selectedNotes,
  selectedKey,
  showScale,
  showFlats,
  handleRemoveNote,
  toggleFlatsSharps
}) {
  const scale = selectedNotes.map(idx => notes[idx]); // ex: ['C','D','E','F','G','A','B']

  return (
    <div className='scale-display-container'>
      <div className='scale-display'>
        <ul>
          {scale.sort().map((note, idx) => {
            return (
              <Note
                key={idx}
                note={note}
                handleRemoveNote={handleRemoveNote}
                showScale={showScale}
                selectedKey={selectedKey}
              />
            );
          })}
        </ul>
        <FlatsSharpsToggle
          selectedNotes={selectedNotes}
          showFlats={showFlats}
          toggleFlatsSharps={toggleFlatsSharps}
        />
      </div>
    </div>
  );
}

export default ScaleDisplay;
