import React, { Component } from 'react';
import { notes } from '../../../data';

class ScaleDisplay extends Component {

  render() {
    const scale = this.props.selectedNotes.map(idx => notes[idx]);  // ex: ['C','D','E','F','G','A','B']

    return (
      <div className="scale-display-container">
        <div className="scale-display">
          <ul>
            {
              scale.sort().map(note => {
                return (
                  <li
                    key={note}
                    className="note-display"
                    onClick={() => this.props.handleRemoveNote(note)}
                  >
                    <span className={`displayed-note${this.props.showScale && note === this.props.selectedKey ? ' note-display-root' : ''}`}>{note}</span>
                  </li>
                )
              })
            }
          </ul>
          <div className="flats-sharps-toggle" onClick={this.props.toggleFlatsSharps}>
            <span>Show Flats</span>
          </div>
        </div>
      </div>
    );
  }

}

export default ScaleDisplay;
