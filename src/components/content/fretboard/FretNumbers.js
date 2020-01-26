import React from 'react';

function FretNumbers(props) {
  return (
    <ul className="fret-numbers">
      {
        Array.from(Array(25)).map((x, idx) => idx).map(num => {
          return (
            <li
              key={num}
              className="fret-number"
              onClick={() => props.handleSelectFretNumber(num)}
              title={`Highlight notes at fret ${num}`}
            >
              <span>{num}</span>
            </li>
          );
        })
      }
    </ul>
  );
}

export default FretNumbers;
