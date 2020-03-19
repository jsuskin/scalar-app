import React, { Component } from "react";
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import jwt from 'jwt-decode';
import { notes, tunings } from "./data";
import {
  initialState,
  updateState,
  updateFretMap,
  removeNote,
  selectedNoteIndices,
  newTuningSelectedFrets,
  newScaleSelectedFrets,
  loginPost,
  registerPost
} from "./utils/HelperMethods";
import "./scss/main.scss";

const fretMap = [];

class App extends Component {
  state = {
    user: {
      username: '',
      password: ''
    },
    loggedIn: !!localStorage.authToken,
    iteration: 0,
    prevState: {},
    showPrevState: false,
    fretMap: [],
    ...initialState
  };

  componentDidMount() {
    this.setState({ fretMap: [...fretMap] });

    if(localStorage.authToken) {
      const token = localStorage.authToken;
      const userId = jwt(token);

      fetch(`http://localhost:4000/api/user/${userId._id}`, {
        headers: {
          'auth-token': localStorage.authToken
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            ...this.state,
            user: {
              ...this.state.user,
              username: data.username
            }
          });
        });
    }
  }

  handleChangeColorScheme = color => this.setState({ colorScheme: color });

  handleTitleClick = () => this.setState(updateState(this.state, initialState));

  handleFretClick = (fret, noteIdx) => {
    // format to store in this.state.selectedFrets; ex: fret = 'string-5-fret-0'
    const fretName = `${fret}-${notes[noteIdx]}`;
    // check if fret is already included in this.state.selectedFrets
    const addFret = !this.state.selectedFrets.includes(fretName);
    // check if note is not already included in this.state.selectedNoteIndices
    const noteNotPresent = this.state.selectedNoteIndices.every(
      arr => arr[0] !== noteIdx
    );
    // note does not exist in this.state.selectedNoteIndices
    const addNoteIdx = [...this.state.selectedNoteIndices, [noteIdx, 1]];
    // note does exist in this.state.selectedNoteIndices
    const increaseNoteCount = this.state.selectedNoteIndices.map(arr =>
      arr[0] === noteIdx ? [arr[0], arr[1] + 1] : arr
    );

    this.setState(
      updateState(this.state, {
        selectedFrets: addFret
          ? [...this.state.selectedFrets, fretName]
          : this.state.selectedFrets.filter(f => f !== fretName),
        selectedNoteIndices: addFret
          ? noteNotPresent
            ? addNoteIdx
            : increaseNoteCount
          : removeNote(noteIdx, this.state),
        selectedScale: "None",
        showScale: false
      })
    );
  };

  // remove all instances of a note by clicking on that note from scale display
  handleRemoveNote = note => {
    this.setState(
      updateState(this.state, {
        selectedFrets: this.state.selectedFrets.filter(
          fret => fret.split("-")[4] !== note
        ),
        selectedNoteIndices: this.state.selectedNoteIndices.filter(
          noteIdxAndFreq => notes[noteIdxAndFreq[0]] !== note
        ),
        selectedScale: "None",
        showScale: false
      })
    );
  };

  handleChange = e => {
    const noScaleValue = e.target.value === "None";
    const showScale = e.target.name === "selectedScale" && !noScaleValue;
    const scale = showScale ? e.target.value : this.state.selectedScale;
    const root = showScale ? this.state.selectedKey : e.target.value;

    const selectedFrets =
      e.target.name === "selectedTuning"
        ? tunings[e.target.value]
            .map((x, idx) =>
              newTuningSelectedFrets(
                this.state.selectedFrets.filter(
                  fret => +fret.split("-")[1] === idx + 1
                ),
                x - Object.values(notes).indexOf(this.state.tuning[idx]),
                idx
              )
            )
            .flat()
        : newScaleSelectedFrets(scale, root, this.state.fretMap);

    this.setState(
      updateState(this.state, {
        [e.target.name]: e.target.value,
        selectedFrets: noScaleValue ? this.state.selectedFrets : selectedFrets,
        selectedNoteIndices:
          noScaleValue || e.target.name === "selectedTuning"
            ? this.state.selectedNoteIndices
            : selectedNoteIndices(scale, root, selectedFrets),
        tuning:
          e.target.name === "selectedTuning" && e.target.value !== "Custom"
            ? tunings[e.target.value].map(idx => notes[idx])
            : this.state.tuning,
        showScale:
          e.target.name === "selectedScale"
            ? !noScaleValue
            : this.state.selectedScale !== "None",
        fretMap:
          e.target.name === "selectedTuning"
            ? updateFretMap(
                tunings[e.target.value].map(idx => notes[idx]),
                this.state.fretMap
              )
            : this.state.fretMap
      })
    );
  };

  selectCompatibleScale = (root, scale) => {
    const selectedFrets = newScaleSelectedFrets(
      scale,
      root,
      this.state.fretMap
    );

    this.setState(
      updateState(this.state, {
        selectedFrets: selectedFrets,
        selectedNoteIndices: selectedNoteIndices(scale, root, selectedFrets),
        selectedScale: scale,
        selectedKey: root,
        showScale: true
      })
    );
  };

  handleClearFretboard = () => {
    this.setState(
      updateState(this.state, {
        selectedFrets: [],
        highlightFretNumbers: [],
        selectedNoteIndices: [],
        selectedScale: "None",
        showScale: false
      })
    );
  };

  handleFillOctaves = () => {
    this.setState(
      updateState(this.state, {
        selectedFrets: this.state.fretMap.filter(fret => {
          return this.state.selectedNoteIndices
            .map(arr => {
              return notes[arr[0]];
            })
            .includes(fret.split("-")[4]);
        }),
        selectedNoteIndices: this.state.selectedNoteIndices.map(arr => {
          return [
            arr[0],
            this.state.fretMap
              .map(fret => fret.split("-")[4])
              .filter(note => note === notes[arr[0]]).length
          ];
        })
      })
    );
  };

  handleAddFrets = (fretName, noteIdx) => {
    if (!this.state.selectedFrets.includes(fretName)) {
      this.setState(
        updateState(this.state, {
          selectedFrets: [...this.state.selectedFrets, fretName]
        })
      );
    }
  };

  addToFretMap = fretName => fretMap.push(fretName);

  toggleFlatsSharps = () => {
    console.log("flats");
  };

  // highlight all dots across one fret
  handleSelectFretNumber = num => {
    const fretSelected = this.state.highlightFretNumbers.includes(num);
    const deselectFret = this.state.highlightFretNumbers.filter(x => x !== num);
    const selectFret = [...this.state.highlightFretNumbers, num];

    this.setState(
      updateState(this.state, {
        highlightFretNumbers: fretSelected ? deselectFret : selectFret
      })
    );
  };

  // tune 1 string
  handleChangeTuning = (e, strNum) => {
    const newTuning = [
      ...this.state.tuning.slice(0, strNum),
      e.target.value,
      ...this.state.tuning.slice(strNum + 1)
    ];

    const changedStringIdx = this.state.tuning.findIndex((string, idx) => {
      return newTuning[idx] !== string;
    });

    const noteIdx = tuning =>
      Object.values(notes).indexOf(tuning[changedStringIdx]);
    const diff = noteIdx(newTuning) - noteIdx(this.state.tuning);
    const fretMap = updateFretMap(newTuning, this.state.fretMap);
    const selectedFrets = newTuningSelectedFrets(
      this.state.selectedFrets,
      diff,
      changedStringIdx
    );

    this.setState(
      updateState(this.state, {
        tuning: newTuning,
        fretMap: fretMap,
        selectedFrets: selectedFrets,
        selectedTuning: "Custom"
      })
    );
  };

  // tune all strings
  handleTuneStrings = step => {
    const newTuning = this.state.tuning.map(string => {
      const currentValue = Object.values(notes).indexOf(string);
      const newValue =
        currentValue + step < 0
          ? 11
          : currentValue + step > 11
          ? 0
          : currentValue + step;

      return notes[newValue];
    });

    const selectedFrets = this.state.tuning
      .map((x, idx) => {
        return newTuningSelectedFrets(
          this.state.selectedFrets.filter(
            fret => +fret.split("-")[1] === idx + 1
          ),
          step,
          idx
        );
      })
      .flat();

    this.setState(
      updateState(this.state, {
        tuning: newTuning,
        selectedFrets: selectedFrets,
        selectedTuning: "Custom",
        fretMap: updateFretMap(newTuning, this.state.fretMap)
      })
    );
  };

  handleIteration = () => {
    this.setState(
      updateState(
        this.state,
        {
          ...this.state.prevState,
          prevState: this.state
        },
        !this.state.showPrevState
      )
    );
  };

  handleFormChange = e => {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    });
  }

  handleSignIn = e => {
    e.preventDefault();
    loginPost(this.state.user);
    setTimeout(() => {
      this.setState({
        ...this.state,
        loggedIn: !!localStorage.authToken,
        user: {
          username: !!localStorage.authToken ? this.state.user.username : '',
          password: ''
        }
      });
    }, 500);
  }

  handleRegister = (e, pw) => {
    e.preventDefault();
    if (this.state.user.password === pw) {
      registerPost(this.state.user);
      // loginPost(this.state.user)
      setTimeout(() => {
        this.setState({
          ...this.state,
          loggedIn: !!localStorage.authToken
        });
      }, 500);
    } else {
      this.setState({
        ...this.state,
        user: {
          username: '',
          password: ''
        }
      })
    }
  };

  handleSignOut = () => {
    localStorage.removeItem("authToken");
    this.setState({
      ...this.state,
      loggedIn: false,
      user: {
        username: '',
        password: ''
      }
    });
  }

  handleSelectFavorite = (name, noteIndices) => {
    const letterNotes = noteIndices.map(idx => notes[idx]);
    const letterNote = fret => fret.split("-")[4];
    const selectedFrets = this.state.fretMap.filter(fret => letterNotes.includes(letterNote(fret)));
    const allNotes = selectedFrets.map(fret => letterNote(fret));
    const selectedNoteIndices = letterNotes.map(note => [Object.values(notes).indexOf(note), allNotes.filter(n => note === n).length]);

    this.setState(
      updateState(this.state, {
        selectedFrets: selectedFrets,
        selectedNoteIndices: selectedNoteIndices,
        selectedScale: 'None',
        showScale: false
      })
    );
  }

  render() {
    return (
      <div className={`app ${this.state.colorScheme}-theme`}>
        <Header
          loggedIn={this.state.loggedIn}
          username={this.state.user.username}
          colorScheme={this.state.colorScheme}
          handleTitleClick={this.handleTitleClick}
          handleChangeColorScheme={this.handleChangeColorScheme}
          handleFormChange={this.handleFormChange}
          handleSignIn={this.handleSignIn}
          handleRegister={this.handleRegister}
          handleSignOut={this.handleSignOut}
          handleSelectFavorite={this.handleSelectFavorite}
        />
        <Content {...this.state} {...this} />
        <Footer {...this.state} handleIteration={this.handleIteration} />
      </div>
    );
  }
}

export default App;
