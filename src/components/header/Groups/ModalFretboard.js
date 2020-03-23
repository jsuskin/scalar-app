import React from 'react';
import { notes } from '../../../data';

export default function ModalFretboard({ fretMap, scaleNotes }) {
  return (
    <ul className='modal-fretboard'>
      {Array.from(Array(6)).map((s, sIdx) => {
        return (
          <li key={sIdx} id={`modal-fretboard-string-${6 - sIdx}`} className="modal-fretboard-string">
            <ul className="modal-fretboard-frets">
              {
                fretMap.filter(fret => +fret.split('-')[1] === sIdx + 1).map((fret, idx) => {
                  return (
                    <li
                      key={idx}
                      className='modal-fretboard-fret-container'
                    >
                      <div
                        className='modal-fretboard-fret'
                      ></div>
                      <div
                        className={`modal-fretboard-dot${
                          scaleNotes
                            .map(idx => notes[idx])
                            .includes(fret.split("-")[4])
                            ? " selected"
                            : ""
                        }`}
                      ></div>
                    </li>
                  );
                })
              }
            </ul>
          </li>
        )
      })}
    </ul>
  );
}
