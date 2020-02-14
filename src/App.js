import React, { Component } from 'react';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import { notes, tunings } from './data';
import { updateState, updateFretMap, selectedNoteIndices, newTuningSelectedFrets, newScaleSelectedFrets } from './utils/HelperMethods';
import './scss/main.scss';

const fretMap = [];

class App extends Component {
  state = {
    iteration: 0,
    colorScheme: 'brown',
    fretMap: [],
    selectedFrets: [],
    highlightFretNumbers: [],
    selectedNoteIndices: [],
    selectedTuning: 'E Standard',
    tuning: ['E', 'B', 'G', 'D', 'A', 'E'],
    selectedScale: 'None',
    selectedKey: 'A',
    showScale: false,
    prevState: {},
    showPrevState: false,
    loggedIn: false
  }

  componentDidMount() {
    this.setState({ fretMap: [...fretMap] });
  }

  handleChangeColorScheme = color => this.setState({ colorScheme: color })

  handleFretClick = (fret, noteIdx) => {
    // format to store in this.state.selectedFrets; ex: fret = 'string-5-fret-0'
    const fretName = `${fret}-${notes[noteIdx]}`;
    // check if fret is already included in this.state.selectedFrets
    const addFret = !this.state.selectedFrets.includes(fretName);
    // check if note is not already included in this.state.selectedNoteIndices
    const noteNotPresent = this.state.selectedNoteIndices.every(arr => arr[0] !== noteIdx);
    // note does not exist in this.state.selectedNoteIndices
    const addNoteIdx = [...this.state.selectedNoteIndices, [noteIdx, 1]];
    // note does exist in this.state.selectedNoteIndices
    const increaseNoteCount = this.state.selectedNoteIndices.map(arr => arr[0] === noteIdx ? [arr[0], arr[1] + 1] : arr);

    // remove 1 note when clicking on fretboard dot
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

  // remove all instances of a note by clicking on that note from scale display
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
    const noScaleValue = e.target.value === 'None';
    const showScale = e.target.name === 'selectedScale' && !noScaleValue;
    const scale = showScale ? e.target.value : this.state.selectedScale;
    const root = showScale ? this.state.selectedKey : e.target.value;
    const selectedFrets = newScaleSelectedFrets(scale, root, this.state.fretMap);

    this.setState(updateState(
      this.state,
      {
        [e.target.name]: e.target.value,
        selectedFrets: noScaleValue ? this.state.selectedFrets : selectedFrets,
        selectedNoteIndices: noScaleValue ? this.state.selectedNoteIndices : selectedNoteIndices(scale, root, selectedFrets),
        tuning: e.target.name === 'selectedTuning' && e.target.value !== 'Custom' ? tunings[e.target.value].map(idx => notes[idx]) : this.state.tuning,
        showScale: e.target.name === 'selectedScale' ? !noScaleValue : this.state.selectedScale !== 'None'
      }
    ));
  }

  selectCompatibleScale = (root, scale) => {
    const selectedFrets = newScaleSelectedFrets(scale, root, this.state.fretMap);

    this.setState(updateState(
      this.state,
      {
        selectedFrets: selectedFrets,
        selectedNoteIndices: selectedNoteIndices(scale, root, selectedFrets),
        selectedScale: scale,
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
          return this.state.selectedNoteIndices
            .map(arr => {
              return notes[arr[0]];
            })
            .includes(fret.split('-')[4])
        }),
        selectedNoteIndices: this.state.selectedNoteIndices.map(arr => {
          return [
            arr[0],
            this.state.fretMap
              .map(fret => fret.split('-')[4])
              .filter(note => note === notes[arr[0]])
              .length
          ];
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

  // fret names added to global frets array as frets are rendered
  addToFretMap = fretName => fretMap.push(fretName)

  toggleFlatsSharps = () => {
    console.log('flats');
  }

  // highlight all dots across one fret
  handleSelectFretNumber = num => {
    const fretSelected = this.state.highlightFretNumbers.includes(num);
    const deselectFret = this.state.highlightFretNumbers.filter(x => x !== num);
    const selectFret = [...this.state.highlightFretNumbers, num] ;

    this.setState(updateState(
      this.state,
      { highlightFretNumbers: fretSelected ? deselectFret : selectFret }
    ));
  }

  // tune 1 string
  handleChangeTuning = (e, strNum) => {
    const newTuning = [
      ...this.state.tuning.slice(0, strNum),
      e.target.value,
      ...this.state.tuning.slice(strNum + 1)
    ];

    const changedStringIdx =
      this.state.tuning
        .findIndex((string, idx) => {
          return newTuning[idx] !== string;
        });

    const noteIdx = tuning => Object.values(notes).indexOf(tuning[changedStringIdx]);
    const diff = noteIdx(newTuning) - noteIdx(this.state.tuning);
    const fretMap = updateFretMap(newTuning, this.state.fretMap);
    const selectedFrets = newTuningSelectedFrets(this.state.selectedFrets, diff);

    this.setState(updateState(
      this.state,
      {
        tuning: newTuning,
        fretMap: fretMap,
        selectedFrets: selectedFrets,
        selectedTuning: 'Custom'
      }
    ));
  }

  // tune all strings
  handleTuneStrings = step => {
    const newTuning = this.state.tuning.map(string => {
      const currentValue = Object.values(notes).indexOf(string);
      const newValue = currentValue + step < 0 ? 11 : currentValue + step > 11 ? 0 : currentValue + step;

      return notes[newValue];
    });

    const selectedFrets = newTuningSelectedFrets(this.state.selectedFrets, step);

    this.setState(updateState(
      this.state,
      {
        tuning: newTuning,
        selectedFrets: selectedFrets,
        selectedTuning: 'Custom',
        fretMap: updateFretMap(newTuning, this.state.fretMap)
      }
    ));
  }

  handleIteration = () => {
    this.setState(updateState(
      this.state,
      {
        ...this.state.prevState,
        prevState: this.state
      },
      !this.state.showPrevState
    ));
  }

  handleLogIn = () => this.setState({ loggedIn: true })

  handleLogOut = () => this.setState({ loggedIn: false })

  render() {
    return (
      <div className={`app ${this.state.colorScheme}-theme`}>
        <Header
          colorScheme={this.state.colorScheme}
          loggedIn={this.state.loggedIn}
          handleLogIn={this.handleLogIn}
          handleLogOut={this.handleLogOut}
          handleChangeColorScheme={this.handleChangeColorScheme}
        />
        <Content
          {...this.state}
          {...this}
        />
        <Footer
          {...this.state}
          handleIteration={this.handleIteration}
        />
      </div>
    );
  }
}

export default App;
