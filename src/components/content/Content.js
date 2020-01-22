import React, { Component } from 'react';
import CompatibleScales from './CompatibleScales';
import ScaleSelect from './ScaleSelect';
import DisplayArea from './DisplayArea';
import { notes, scales } from '../../data';

const fretMap = [];

class Content extends Component {
  state = {
    fretMap: [],
    selectedFrets: [],
    highlightFretNumbers: [],
    selectedNoteIndices: [],
    tuning: ['E', 'B', 'G', 'D', 'A', 'E'],
    selectedScale: 'None',
    selectedKey: 'A',
    showScale: false,
    prevState: {}
  }

  componentDidMount() {
    this.setState({
      fretMap: [...fretMap]
    });
  }

  handleFretClick = (fret, noteIdx) => {
    // format to store in this.state.selectedFrets
    const fretName = `${fret}-${notes[noteIdx]}`;
    // check if fret is already included in this.state.selectedFrets
    const addFret = !this.state.selectedFrets.includes(fretName);
    // check if note is not already included in this.state.selectedNoteIndices
    const noteNotPresent = this.state.selectedNoteIndices.every(arr => arr[0] !== noteIdx);
    // note does not exist in this.state.selectedNoteIndices
    const addNoteIdx = [...this.state.selectedNoteIndices, [noteIdx, 1]];
    // note does exist in this.state.selectedNoteIndices
    const increaseNoteCount = this.state.selectedNoteIndices.map(arr => arr[0] === noteIdx ? [arr[0], arr[1] + 1] : arr);

    const removeNote = noteIdx => {
      const selectedNoteIndices = this.state.selectedNoteIndices.slice();

      // [noteIdx, frequency]
      // i.e. [0, 4] --> there are currently 4 occurences of note A on fretboard
      const index = selectedNoteIndices.find(x => x[0] === noteIdx);
      const newIndex = [index[0], index[1] - 1];

      return index[1] > 1 ? [...selectedNoteIndices.slice(0, selectedNoteIndices.indexOf(index)), ...selectedNoteIndices.slice(selectedNoteIndices.indexOf(index) + 1), newIndex] : selectedNoteIndices.filter(x =>  x[0] !== noteIdx);
    }

    this.setState(updateState(
      this.state,
      {
        selectedFrets: addFret ? [...this.state.selectedFrets, fretName] : this.state.selectedFrets.filter(f => f !== fretName),
        selectedNoteIndices: addFret ? noteNotPresent ? addNoteIdx : increaseNoteCount : removeNote(noteIdx),
        selectedScale: 'None',
        showScale: false
      }
    ));
  }

  handleRemoveNote = note => {
    this.setState(updateState(
      this.state,
      {
        selectedFrets: this.state.selectedFrets.filter(fret => fret.split('-')[4] !== note),
        selectedNoteIndices: this.state.selectedNoteIndices.filter(noteIdxAndFreq => notes[noteIdxAndFreq[0]] !== note),
        selectedScale: 'None',
        showScale: false
      }
    ));
  }

  handleChange = e => {
    const showScale = e.target.name === 'selectedScale' && e.target.value !== 'None';
    const scale = showScale ? e.target.value : this.state.selectedScale;
    const root = showScale ? this.state.selectedKey : e.target.value;

    const setScale = (scale, root) => {
      const chrom = Object.values(notes)
      const chromFromRoot = [...chrom.slice(chrom.indexOf(root)), ...chrom.slice(0, chrom.indexOf(root))];
      const scaleNotes = scales[scale].map(idx => chromFromRoot[idx]);
      const selectedFrets = this.state.fretMap.filter(fret => scaleNotes.includes(fret.split('-')[4]));

      this.setState(updateState(
        this.state,
        {
          [e.target.name]: e.target.value,
          selectedFrets: e.target.value === 'None' ? this.state.selectedFrets : selectedFrets,
          selectedNoteIndices: e.target.value === 'None' ? this.state.selectedNoteIndices : scales[scale].map(i => {
            const rootIdx = Object.values(notes).indexOf(root);
            const idx = i + rootIdx < 12 ? i + rootIdx : i + rootIdx - 12;

            return [
              idx,
              selectedFrets.map(fret => fret.split('-')[4]).filter(note => notes[idx] === note).length
            ];
          }),
          showScale: e.target.name === 'selectedScale' ? e.target.value !== 'None' :  this.state.selectedScale !== 'None'
        }
      ));
    }

    setScale(scale, root);
  }

  handleSwitchScale = (root, scaleName) => {
    // ['A', 'A#', 'B', 'C', ..., 'G', 'G#']
    const chrom = Object.values(notes);
    // ex: root = 'C' --> ['C', 'C#', 'D', ..., 'A#', 'B']
    const chromFromRoot = [...chrom.slice(chrom.indexOf(root)), ...chrom.slice(0, chrom.indexOf(root))];
    // ex: [0,2,4,5,7,9,11] --> ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    const scaleNotes = scales[scaleName].map(idx => chromFromRoot[idx]);
    const selectedFrets = this.state.fretMap.filter(fret => scaleNotes.includes(fret.split('-')[4]));

    this.setState(updateState(
      this.state,
      {
        selectedFrets: selectedFrets,
        selectedNoteIndices: scales[scaleName].map(i => {
          const rootIdx = Object.values(notes).indexOf(root);
          const idx = i + rootIdx < 12 ? i + rootIdx : i + rootIdx - 12;

          return [
            idx,
            selectedFrets
              .map(fret => fret.split('-')[4])
              .filter(note => notes[idx] === note)
              .length
          ];
        }),
        selectedScale: scaleName,
        selectedKey: root,
        showScale: true
      }
    ));
  }

  handleClearFretboard = () => {
    this.setState(updateState(
      this.state,
      {
        selectedFrets: [],
        highlightFretNumbers: [],
        selectedNoteIndices: [],
        tuning: ['E', 'B', 'G', 'D', 'A', 'E'],
        selectedScale: 'None',
        showScale: false
      }
    ));
  }

  handleFillOctaves = () => {
    this.setState(updateState(
      this.state,
      {
        selectedFrets: this.state.fretMap.filter(fret => {
          return this.state.selectedNoteIndices.map(arr => {
            return notes[arr[0]]
          }).includes(fret.split('-')[4])
        }),
        selectedNoteIndices: this.state.selectedNoteIndices.map(arr => {
          return [
            arr[0],
            this.state.fretMap.map(fret => fret.split('-')[4]).filter(note => note === notes[arr[0]]).length
          ]
        })
      }
    ));
  }

  handleAddFrets = (fretName, noteIdx) => {
    if(!this.state.selectedFrets.includes(fretName)) {
      this.setState(updateState(
        this.state,
        { selectedFrets: [...this.state.selectedFrets, fretName] }
      ));
    }
  }

  addToFretMap = fretName => { fretMap.push(fretName) }

  toggleFlatsSharps = () => {
    console.log('flats')
  }

  handleSelectFretNumber = num => {
    const fretSelected = this.state.highlightFretNumbers.includes(num);
    const deselectFret = this.state.highlightFretNumbers.filter(x => x !== num);
    const selectFret = [...this.state.highlightFretNumbers, num] ;

    this.setState(updateState(
      this.state,
      { highlightFretNumbers: fretSelected ? deselectFret : selectFret }
    ));
  }

  handleChangeTuning = (e, strNum) => {
    const newTuning = [...this.state.tuning.slice(0, strNum), e.target.value, ...this.state.tuning.slice(strNum + 1)];

    this.setState({
      tuning: newTuning
    });
  }

  handleTuneStrings = step => {
    const newTuning = this.state.tuning.map(string => {
      const currentValue = Object.values(notes).indexOf(string);
      const newValue = currentValue + step < 0 ? 11 : currentValue + step > 11 ? 0 : currentValue + step;

      return notes[newValue];
    });

    this.setState(updateState(
      this.state,
      {
        tuning: newTuning,
        selectedFrets: this.state.selectedFrets.map(fret => {
          let [ str, stringNum, fr, fretNum, note ] = fret.split('-');

          fretNum =
            step > 0 && +fretNum === 0 ?
              23 :
            (step > 0 && +fretNum === 1) || (step < 0 && +fretNum === 23) ?
              [0, 24] :
            step < 0 && +fretNum === 24 ?
              1 :
              +fretNum - step;

          const fretString = num => `${str}-${stringNum}-${fr}-${num}-${note}`;

          return Array.isArray(fretNum) ? fretNum.map(num => fretString(num)) : fretString(fretNum);
        })
          .flat()
          .filter((item, idx, self) => self.indexOf(item) === idx)
      }
    ));
  }

  render() {
    const selectedNotes = this.state.selectedNoteIndices
      .map(x => x[0])
      .sort((a,b) => a > b ? 1 : -1);

    return (
      <div className="content">
        <CompatibleScales
          selectedScale={this.state.selectedScale}
          selectedNoteIndices={this.state.selectedNoteIndices}
          selectedKey={this.state.selectedKey}
          showScale={this.state.showScale}
          handleSwitchScale={this.handleSwitchScale}
        />
        <ScaleSelect
          selectedScale={this.state.selectedScale}
          selectedKey={this.state.selectedKey}
          handleChange={this.handleChange}
        />
        <DisplayArea
          showScale={this.state.showScale}
          selectedNotes={selectedNotes}
          selectedKey={this.state.selectedKey}
          tuning={this.state.tuning}
          selectedFrets={
            this.state.selectedFrets.map(fret => {
              return fret.split('-').slice(0, 4).join('-');
            })
          }
          highlightFretNumbers={this.state.highlightFretNumbers}
          handleFretClick={this.handleFretClick}
          handleRemoveNote={this.handleRemoveNote}
          addToFretMap={this.addToFretMap}
          handleClearFretboard={this.handleClearFretboard}
          handleFillOctaves={this.handleFillOctaves}
          handleAddFrets={this.handleAddFrets}
          toggleFlatsSharps={this.toggleFlatsSharps}
          handleSelectFretNumber={this.handleSelectFretNumber}
          handleChangeTuning={this.handleChangeTuning}
          handleTuneStrings={this.handleTuneStrings}
        />
      </div>
    );
  }

}

// Helper Methods
function updateState(state, obj) {
  return state => {
    const prevState = limitIterationsOfPrevStateInPrevState(state);
    return {
      ...state,
      ...obj,
      prevState: prevState
    }
  }
}

function limitIterationsOfPrevStateInPrevState(previousState) {
  // separate prevState from the rest of state
  const obj = () => {
    const { prevState, ...rest } = previousState;
    return {prevState:prevState, rest:rest}
  }

  // omit 2nd level prevState key
  const { prevState: omitted, ...rest} = obj().prevState;

  // combine them
  return { ...obj().rest, prevState: rest }
}

export default Content;
