import React from 'react';
import { notes } from '../../../data'

function Tuning(props) {
  return (
    <div className="tuning-container">
      <ul className="tuning">
        <li
          className="tune-all-strings tune-up"
          onClick={() => props.handleTuneStrings(1)}
          title="Tune all strings up one half-step"
        >
        </li>
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
        <li
          className="tune-all-strings tune-down"
          onClick={() => props.handleTuneStrings(-1)}
          title="Tune all strings down one half-step"
        >
        </li>
      </ul>
    </div>
  );
}

export default Tuning;
