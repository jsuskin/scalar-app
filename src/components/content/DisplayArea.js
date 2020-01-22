import React, { Component } from 'react';
import Fretboard from './fretboard/Fretboard';
import ScaleDisplay from './ScaleDisplay';
import FretboardButtons from './FretboardButtons';

class DisplayArea extends Component {

  render() {
    const {
      showScale,
      addToFretMap,
      tuning,
      selectedFrets,
      handleFretClick,
      selectedNotes,
      selectedKey,
      handleRemoveNote,
      handleClearFretboard,
      handleFillOctaves,
      highlightFretNumbers,
      toggleFlatsSharps
    } = this.props;

    return (
      <div className="display-area">
        <Fretboard
          addToFretMap={addToFretMap}
          tuning={tuning}
          selectedFrets={selectedFrets}
          highlightFretNumbers={highlightFretNumbers}
          handleFretClick={handleFretClick}
          selectedNotes={selectedNotes}
          handleAddFrets={this.props.handleAddFrets}
          handleSelectFretNumber={this.props.handleSelectFretNumber}
          handleChangeTuning={this.props.handleChangeTuning}
          handleTuneStrings={this.props.handleTuneStrings}
        />
        <div className="bottom-display">
          <ScaleDisplay
            selectedNotes={selectedNotes}
            selectedKey={selectedKey}
            showScale={showScale}
            handleRemoveNote={handleRemoveNote}
            toggleFlatsSharps={toggleFlatsSharps}
          />
          <FretboardButtons
            selectedNotes={selectedNotes}
            handleFillOctaves={handleFillOctaves}
            handleClearFretboard={handleClearFretboard}
          />
        </div>
      </div>
    );
  }

}

export default DisplayArea;
