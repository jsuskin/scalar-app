import React from 'react'

export default function FlatsSharpsToggle({ selectedNotes, showFlats, toggleFlatsSharps }) {
  return (
    <div
      className={`flats-sharps-toggle${
        selectedNotes.length ? "" : " no-scale-displayed"
      }`}
    >
      <span
        title={`Display ${showFlats ? "Sharps" : "Flats"}`}
        className={`display-${showFlats ? "sharps" : "flats"}`}
        onClick={toggleFlatsSharps}
      >
        {showFlats ? "♯" : "♭"}
      </span>
    </div>
  );
}
