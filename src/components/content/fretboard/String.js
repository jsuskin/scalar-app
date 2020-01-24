import React, { Component } from 'react';
import Fret from './Fret';

class String extends Component {

  render() {
    const { sIdx, stringName, openNote } = this.props;

    return (
      <li className="string-container">
        <ul id={stringName} className="string">
          {
            Array.from(Array(25)).map((f, fIdx) => {
              const fretName = `${stringName}-fret-${fIdx}`;
              // console.log(fretName)
              return (
                <Fret
                  highlightFret={this.props.highlightFretNumbers.includes(fIdx)}
                  key={`${sIdx}-${fIdx}`}
                  openNote={openNote}
                  fretName={fretName}
                  fIdx={fIdx}
                  sIdx={sIdx}
                  selected={this.props.selectedFrets.includes(fretName)}
                  showScale={this.props.showScale}
                  selectedKey={this.props.selectedKey}
                  handleFretClick={this.props.handleFretClick}
                  handleAddFrets={this.props.handleAddFrets}
                  addToFretMap={this.props.addToFretMap}
                />
              );
            })
          }
        </ul>
      </li>
    );
  }

}

export default String;
