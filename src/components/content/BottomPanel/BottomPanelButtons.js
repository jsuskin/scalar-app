import React from 'react';
import BottomPanelButton from './BottomPanelButton';

function BottomPanelButtons(props) {
  const { selectedNotes, handleFillOctaves, handleClearFretboard } = props;
  return (
    <div className="bottom-panel-buttons">
      <BottomPanelButton
        classNames={`bottom-panel-btn fill-octaves${selectedNotes.length ? ' show-bottom-panel-buttons' : ''}`}
        handleClick={handleFillOctaves}
        text="Fill Octaves"
      />
      <BottomPanelButton
        classNames={`bottom-panel-btn clear-fretboard${selectedNotes.length ? ' show-bottom-panel-buttons' : ''}`}
        handleClick={handleClearFretboard}
        text="Clear Fretboard"
      />
      <BottomPanelButton
        classNames={`bottom-panel-btn${selectedNotes.length ? ' show-bottom-panel-buttons' : ''}`}
        handleClick={() => console.log('clicky')}
        text="Save Scale"
      />
      <BottomPanelButton
        classNames={`bottom-panel-btn${selectedNotes.length ? ' show-bottom-panel-buttons' : ''}`}
        handleClick={() => console.log('clicky')}
        text="Add To Group"
      />
    </div>
  );
}

export default BottomPanelButtons;
