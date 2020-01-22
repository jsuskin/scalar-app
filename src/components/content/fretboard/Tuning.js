import React from 'react';
import { notes } from '../../../data'

function Tuning(props) {
  return (
    <div className="tuning-container">
      <span
        className="tune-all-strings tune-up"
        onClick={() => props.handleTuneStrings(1)}
      >
        >
      </span>
      <ul className="tuning">
        {
          props.tuning.map((string, idx) => {
            return (
              <li key={idx}>
                <select value={string} onChange={e => props.handleChangeTuning(e, idx)}>
                  {
                    Object.values(notes).map(note => {
                      return (
                        <option key={note} value={note}>{note}</option>
                      )
                    })
                  }
                </select>
              </li>
            )
          })
        }
      </ul>
      <span
        className="tune-all-strings tune-down"
        onClick={() => props.handleTuneStrings(-1)}
      >
        >
      </span>
    </div>
  );
}

export default Tuning;
