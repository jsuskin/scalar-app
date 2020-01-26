import React from 'react';
import CompatibleScales from './CompatibleScales/CompatibleScales';
import ScaleOptions from './ScaleOptions/ScaleOptions';
import DisplayArea from './DisplayArea';

function Content(props) {
  const selectedNotes = props.selectedNoteIndices
    .map(x => x[0])
    .sort((a,b) => a > b ? 1 : -1);

  const selectedFrets = props.selectedFrets
    .map(fret => fret.split('-').slice(0, 4).join('-'));

  return (
    <div className="content">
      <CompatibleScales
        selectedScale={props.selectedScale}
        selectedNoteIndices={props.selectedNoteIndices}
        selectedKey={props.selectedKey}
        showScale={props.showScale}
        selectCompatibleScale={props.selectCompatibleScale}
      />
      <ScaleOptions
        selectedScale={props.selectedScale}
        selectedKey={props.selectedKey}
        handleChange={props.handleChange}
      />
      <DisplayArea
        showScale={props.showScale}
        selectedNotes={selectedNotes}
        selectedKey={props.selectedKey}
        tuning={props.tuning}
        selectedFrets={selectedFrets}
        highlightFretNumbers={props.highlightFretNumbers}
        handleFretClick={props.handleFretClick}
        handleRemoveNote={props.handleRemoveNote}
        addToFretMap={props.addToFretMap}
        handleClearFretboard={props.handleClearFretboard}
        handleFillOctaves={props.handleFillOctaves}
        handleAddFrets={props.handleAddFrets}
        toggleFlatsSharps={props.toggleFlatsSharps}
        handleSelectFretNumber={props.handleSelectFretNumber}
        handleChangeTuning={props.handleChangeTuning}
        handleTuneStrings={props.handleTuneStrings}
      />
    </div>
  );
}

export default Content;
