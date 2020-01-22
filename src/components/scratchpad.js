// Fret.js
import React, { Component } from 'react';
import { notes } from '../data';

class Fret extends Component {
  componentDidMount() {
    if(this.props.fillOctaves) {
      if(this.props.selectedNoteIndices.map(arr => arr[0]).includes(note()[0])) {
        this.props.handleAddFrets(`${this.props.fretName}-${note()[1]}`, note()[0]);
      }
    }
  }

  render() {
    const {
      fretName,
      fIdx,
      sIdx,
      selected,
      openNote
    } = this.props;

    return (
      <li
        id={`fret-container-${sIdx}-${fIdx}`}
        className="fret-container"
        onClick={() => this.props.handleFretClick(fretName, note(openNote, fIdx)[0])}
      >
        <div id={fretName} className="fret">
          <div className="string-fragment">
            <div className={`selected-display${selected ? ' selected' : ''}`}>
              <div className="note">{note(openNote, fIdx)[1]}</div>
              <div className="dot"></div>
            </div>
          </div>
        </div>
      </li>
    );
  }

}

const note = (openNote, fIdx) => {
  const openIdx = +Object.keys(notes).find(key => notes[key] === openNote);
  const noteIdx = openIdx + fIdx - 12 * Math.floor((openIdx + fIdx)/12);

  return [ noteIdx, notes[noteIdx] ];
};

export default Fret;
