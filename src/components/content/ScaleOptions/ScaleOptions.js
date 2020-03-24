import React, { useState, useEffect } from 'react';
import Select from './Select';
import { scales, notes, tunings } from '../../../data';
import { fetchFavs } from '../../../utils/HelperMethods';

function ScaleOptions(props) {
  // TODO: write code to list favs in 'scales' dropdown
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    if(localStorage.authToken) {
      fetchFavs(setFavs);
    } else {
      setFavs([]);
    }
  }, []);

  return (
    <div className="selection-container">
      <Select
        selectionType="tuning"
        selectionName="selectedTuning"
        selectionValue={props.selectedTuning}
        handleChange={props.handleChange}
        // handleChange={() => console.log('change tuning')}
        arr={Object.keys(tunings)}
        func={tuning => <option key={tuning} value={tuning}>{tuning}</option>}
      />
      <Select
        selectionType="scale"
        selectionName="selectedScale"
        selectionValue={props.selectedScale}
        handleChange={props.handleChange}
        // arr={[...Object.keys(scales), ...favs.map(fav => fav.name)]}
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
