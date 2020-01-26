import React from 'react';
import Select from './Select';
import { scales, notes } from '../../../data';

function ScaleOptions(props) {
  return (
    <div className="selection-container">
      <Select
        selectionType="scale"
        selectionName="selectedScale"
        selectionValue={props.selectedScale}
        handleChange={props.handleChange}
        arr={Object.keys(scales)}
        func={name => <option key={name} value={name}>{name}</option>}
      />
      <Select
        selectionType="key"
        selectionName="selectedKey"
        selectionValue={props.selectedKey}
        handleChange={props.handleChange}
        arr={Object.keys(notes)}
        func={idx => <option key={idx} value={notes[idx]}>{notes[idx]}</option>}
      />
    </div>
  );
}

export default ScaleOptions;
