import React from 'react';

function FretboardButtons(props) {
  const { selectedNotes, handleFillOctaves, handleClearFretboard } = props;
  return (
    <div className="fretboard-buttons">
      <button
        className={
          `fretboard-btn fill-octaves${selectedNotes.length ? ' show-fretboard-buttons' : ''}`
        }
        onClick={handleFillOctaves}
      >
        Fill Octaves
      </button>
      <button
        className={
          `fretboard-btn clear-fretboard${selectedNotes.length ? ' show-fretboard-buttons' : ''}`
        }
        onClick={handleClearFretboard}
      >
        Clear Fretboard
      </button>
    </div>
  );
}

export default FretboardButtons;
