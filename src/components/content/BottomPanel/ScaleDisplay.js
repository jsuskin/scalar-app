import React, { Component } from "react";
import { notes } from "../../../data";

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
              <li
                key={idx}
                className='note-display'
                onClick={() => handleRemoveNote(note)}
              >
                <span
                  className={`displayed-note${
                    showScale && note === selectedKey
                      ? " note-display-root"
                      : ""
                  }`}
                >
                  {note}
                </span>
              </li>
            );
          })}
        </ul>
        <div className={`flats-sharps-toggle${selectedNotes.length ? '' : ' no-scale-displayed'}`}>
          <span
            title={`Display ${showFlats ? "Sharps" : "Flats"}`}
            className={`display-${showFlats ? "sharps" : "flats"}`}
            onClick={toggleFlatsSharps}
          >
            {showFlats ? "♯" : "♭"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ScaleDisplay;
