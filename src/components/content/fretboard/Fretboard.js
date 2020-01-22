import React from 'react';
import Tuning from './Tuning';
import Strings from './Strings';
import FretNumbers from './FretNumbers';

function Fretboard(props) {
  return (
    <div className="fretboard">
      <Tuning
        tuning={props.tuning}
        handleChangeTuning={props.handleChangeTuning}
        handleTuneStrings={props.handleTuneStrings}
      />
      <Strings {...props} />
      <FretNumbers handleSelectFretNumber={props.handleSelectFretNumber} />
    </div>
  );
}

export default Fretboard;
