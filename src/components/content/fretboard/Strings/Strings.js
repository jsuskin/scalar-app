import React from 'react';
import String from './String';

function Strings(props) {
  return (
    <ul className="strings">
      {
        Array.from(Array(6)).map((s, sIdx) => {
          const stringName = `string-${sIdx + 1}`;
          const openNote = props.tuning[sIdx];

          return (
            <String
              key={sIdx}
              {...props}
              sIdx={sIdx}
              stringName={stringName}
              openNote={openNote}
            />
          )
        })
      }
    </ul>
  );
}

export default Strings;
