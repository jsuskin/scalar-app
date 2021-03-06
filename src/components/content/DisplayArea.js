import React from "react";
import Fretboard from "./fretboard/Fretboard";
import ScaleDisplay from "./BottomPanel/ScaleDisplay/ScaleDisplay";
import BottomPanelButtons from "./BottomPanel/Buttons/BottomPanelButtons";

function DisplayArea({
  loggedIn,
  showFlats,
  showScale,
  addToFretMap,
  tuning,
  selectedFrets,
  handleFretClick,
  selectedNotes,
  selectedScale,
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
}) {
  return (
    <div className='display-area'>
      <Fretboard
        addToFretMap={addToFretMap}
        tuning={tuning}
        selectedFrets={selectedFrets}
        highlightFretNumbers={highlightFretNumbers}
        handleFretClick={handleFretClick}
        selectedNotes={selectedNotes}
        showScale={showScale}
        selectedKey={selectedKey}
        handleAddFrets={handleAddFrets}
        handleSelectFretNumber={handleSelectFretNumber}
        handleChangeTuning={handleChangeTuning}
        handleTuneStrings={handleTuneStrings}
      />
      <div className='bottom-display'>
        <ScaleDisplay
          selectedNotes={selectedNotes}
          selectedKey={selectedKey}
          showScale={showScale}
          showFlats={showFlats}
          handleRemoveNote={handleRemoveNote}
          toggleFlatsSharps={toggleFlatsSharps}
        />
        <BottomPanelButtons
          loggedIn={loggedIn}
          selectedNotes={selectedNotes}
          selectedScale={selectedScale}
          handleFillOctaves={handleFillOctaves}
          handleClearFretboard={handleClearFretboard}
        />
      </div>
    </div>
  );
}

export default DisplayArea;
