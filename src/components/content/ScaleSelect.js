import React, { Component } from 'react';
import { scales, notes } from '../../data';

class ScaleSelect extends Component {

  render() {
    return (
      <div className="selection-container">
        <div className="scale-select">
          <label htmlFor="scale-select">Scale</label>
          <select id="scale-select" name="selectedScale" value={this.props.selectedScale} onChange={this.props.handleChange}>
            {Object.keys(scales).map(name => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>
        <div className="key-select">
          <label htmlFor="key-select">Key</label>
          <select id="key-select" name="selectedKey" value={this.props.selectedKey} onChange={this.props.handleChange}>
            {Object.keys(notes).map(idx => <option key={idx} value={notes[idx]}>{notes[idx]}</option>)}
          </select>
        </div>
      </div>
    );
  }

}

export default ScaleSelect;
