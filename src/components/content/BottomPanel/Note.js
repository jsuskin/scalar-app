import React from 'react'

export default function Note({ note, handleRemoveNote, showScale, selectedKey }) {
  return (
    <li
      className='note-display'
      onClick={() => handleRemoveNote(note)}
    >
      <span
        className={`displayed-note${
          showScale && note === selectedKey ? " note-display-root" : ""
        }`}
      >
        {note}
      </span>
    </li>
  );
}
