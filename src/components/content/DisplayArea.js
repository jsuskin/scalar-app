import React from 'react';
import Fretboard from './Fretboard/Fretboard';
import ScaleDisplay from './BottomPanel/ScaleDisplay';
import FretboardButtons from './BottomPanel/FretboardButtons';

function DisplayArea(props) {
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
      toggleFlatsSharps,
      handleAddFrets,
      handleSelectFretNumber,
      handleChangeTuning,
      handleTuneStrings
    } = props;

    return (
      <div className="display-area">
        <Fretboard
          addToFretMap={addToFretMap}
          tuning={tuning}
          selectedFrets={selectedFrets}
          highlightFretNumbers={highlightFretNumbers}
          handleFretClick={handleFretClick}
          selectedNotes={selectedNotes}
          handleAddFrets={handleAddFrets}
          handleSelectFretNumber={handleSelectFretNumber}
          handleChangeTuning={handleChangeTuning}
          handleTuneStrings={handleTuneStrings}
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

export default DisplayArea;
