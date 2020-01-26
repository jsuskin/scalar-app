import React, { Component } from 'react';
import { notes } from '../../../../data';

class Fret extends Component {
  state = {
    fretName: `${this.props.fretName}-${note(this.props.openNote, this.props.fIdx)[1]}`
  }

  componentDidMount() {
    this.props.addToFretMap(this.state.fretName);
  }

  render() {
    const {
      fretName,
      fIdx,
      sIdx,
      selected,
      openNote,
      highlightFret,
      selectedKey,
      showScale
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
              <div
                className={
                  `note
                  ${showScale && selectedKey === note(openNote, fIdx)[1] ? ' root-note' : ''}`
                }
              >
                {note(openNote, fIdx)[1]}
              </div>
              <div
                className={
                  `dot
                  ${highlightFret ? ' highlighted-fret' : ''}
                  ${showScale && selectedKey === note(openNote, fIdx)[1] ? ' root-note' : ''}`
                }
              >
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }

}

function note(openNote, fIdx) {
  const openIdx = +Object.keys(notes).find(key => notes[key] === openNote);
  const noteIdx = openIdx + fIdx - 12 * Math.floor((openIdx + fIdx)/12);

  return [ noteIdx, notes[noteIdx] ];
};

export default Fret;
