import { notes, scales } from "../data";
import axios from "axios";

let iteration = 0;

export const initialState = {
  selectedFrets: [],
  highlightFretNumbers: [],
  selectedNoteIndices: [],
  selectedTuning: "E Standard",
  tuning: ["E", "B", "G", "D", "A", "E"],
  selectedScale: "None",
  selectedKey: "A",
  showScale: false,
  colorScheme: "brown"
};

function limitIterationsOfPrevStateInPrevState(previousState) {
  // separate prevState from the rest of state
  const obj = () => {
    const { prevState, ...rest } = previousState;
    return { prevState: prevState, rest: rest };
  };

  // omit 2nd level prevState key
  const { prevState: omitted, ...rest } = obj().prevState;

  // combine them
  return { ...obj().rest, prevState: rest };
}

export function updateState(state, obj, showPrevState = false) {
  iteration += 1;
  return state => {
    const prevState = limitIterationsOfPrevStateInPrevState(state);
    return {
      ...state,
      ...obj,
      prevState: prevState,
      iteration: iteration,
      showPrevState: showPrevState
    };
  };
}

export function updateFretMap(tuning, frets) {
  const openIdx = openNote =>
    +Object.keys(notes).find(key => notes[key] === openNote);

  const noteIdx = (fIdx, openNote) => {
    // 0 if fIdx + openIdx < 12, 1 if > 12 & < 24, etc.
    const multiplier = Math.floor((openIdx(openNote) + fIdx) / 12);

    // ex: openNote = 'G', fIdx = 17
    // --> openIdx('G') + 17 - 12 * Math.floor((10 + 17) / 12)
    // --> 10 + 17 - 12 * Math.floor((10 + 17) / 12)
    // --> 27 - 12 * Math.floor(27 / 12)
    // --> 27 - 12 * Math.floor(2.25)
    // --> 27 - 12 * 2
    // --> 27 - 24
    // --> 3
    return openIdx(openNote) + fIdx - 12 * multiplier;
  };

  return frets.map(fret => {
    let [str, strNum, fr, frNum, note] = fret.split("-");

    note = notes[noteIdx(+frNum, notes[openIdx(tuning[strNum - 1])])];

    return `${str}-${strNum}-${fr}-${frNum}-${note}`;
  });
}

export // remove 1 note when clicking on fretboard dot
const removeNote = (noteIdx, state) => {
  const selectedNoteIndices = state.selectedNoteIndices.slice();

  // [noteIdx, frequency]
  // i.e. [0, 4] --> there are currently 4 occurences of note A on fretboard
  const index = selectedNoteIndices.find(x => x[0] === noteIdx);
  const newIndex = [index[0], index[1] - 1];

  return index[1] > 1
    ? [
        ...selectedNoteIndices.slice(0, selectedNoteIndices.indexOf(index)),
        ...selectedNoteIndices.slice(selectedNoteIndices.indexOf(index) + 1),
        newIndex
      ]
    : selectedNoteIndices.filter(x => x[0] !== noteIdx);
};

export const selectedNoteIndices = (scale, root, selectedFrets) =>
  scales[scale].map(i => {
    const rootIdx = Object.values(notes).indexOf(root);
    const idx = i + rootIdx < 12 ? i + rootIdx : i + rootIdx - 12;

    return [
      idx,
      selectedFrets
        .map(fret => fret.split("-")[4])
        .filter(note => notes[idx] === note).length
    ];
  });

export const newTuningSelectedFrets = (selectedFrets, diff, changedIdx) => {
  const changedStringNum = changedIdx + 1;

  return selectedFrets
    .map(fret => {
      let [str, stringNum, fr, fretNum, note] = fret.split("-");  // string-6-fret-8-C
      const newFret = +fretNum - diff;  // 10

      fretNum =
        newFret < 0
          ? 24 + newFret
          : newFret > 24
          ? newFret - 24
          : newFret === 0 || newFret === 24
          ? [0, 24]
          : newFret;

      const fretString = num => changedStringNum === +stringNum ? `${str}-${stringNum}-${fr}-${num}-${note}` : fret;

      return Array.isArray(fretNum)
        ? fretNum.map(num => fretString(num))
        : fretString(fretNum);
    })
    .flat()
    .filter((item, idx, self) => self.indexOf(item) === idx);
};

export const newScaleSelectedFrets = (scale, root, fretMap) => {
  // ['A', 'A#', 'B', 'C', ..., 'G', 'G#']
  const chrom = Object.values(notes);
  const rootIdx = chrom.indexOf(root);

  // ex: root = 'C' --> ['C', 'C#', 'D', ..., 'A#', 'B']
  const chromFromRoot = [...chrom.slice(rootIdx), ...chrom.slice(0, rootIdx)];

  // ex: [0,2,4,5,7,9,11] --> ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  const scaleNotes = scales[scale].map(idx => chromFromRoot[idx]);
  const selectedFrets = fretMap.filter(fret =>
    scaleNotes.includes(fret.split("-")[4])
  );

  return selectedFrets;
};

const removeErroneous = scaleName => {
  return ["Chromatic", "None"].every(selection => scaleName !== selection);
};

export const compatibleScales = (
  scaleNames,
  scaleFromCurrentRoot,
  showScale,
  selectedScale,
  selectedKey,
  selectedNoteIndices
) =>
  scaleNames
    .filter(removeErroneous)
    .map(scaleName => {
      // ex: 'Major Scale'
      const scaleFromA = scales[scaleName]; // ex: [0, 2, 4, 5, 7, 9, 11]

      // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      const everyKey = Array.from(Array(12)).map((x, step) => {
        return {
          name: scaleName,
          root: notes[step],
          arr: scaleFromCurrentRoot(scaleFromA, step)
        };
      });

      const matchingKeys = everyKey.filter(obj => {
        const scaleFromRoot = scaleFromCurrentRoot(
          showScale
            ? scales[selectedScale]
            : selectedNoteIndices.map(arr => arr[0]),
          Object.values(notes).indexOf(selectedKey)
        );

        const rootScaleHasCurrentScale = obj.arr.every(idx =>
          scaleFromRoot.includes(idx)
        );

        const currentScaleHasRootScale = scaleFromRoot.every(idx =>
          obj.arr.includes(idx)
        );

        return rootScaleHasCurrentScale || currentScaleHasRootScale;
      });

      return matchingKeys;
    })
    .filter(arr => arr.length)
    .map(arr => {
      return arr.filter(obj => {
        return !(obj.name === selectedScale && obj.root === selectedKey);
      });
    });

// FETCHES

export const loginPost = (userData) => {
  fetch("http://localhost:4000/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(function(response) {
      if (response.ok) {
        const token = response.headers.get("auth-token");
        localStorage.setItem("authToken", token);
      }
      throw new Error("Network response was not ok.");
    })
    .catch(function(error) {
      console.log(
        "There has been a problem with your fetch operation: " + error
      );
    });
}

export const registerPost = userData => {
  fetch("http://localhost:4000/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(function(response) {
      if (response.ok) {
        console.log(response);
        return response;
      }
      throw new Error("Network response was not ok.");
    })
    .catch(function(error) {
      console.log(
        "There has been a problem with your fetch operation: " + error
      );
    });
}

export const postFav = (scaleName, selectedNotes) => {
  fetch("http://localhost:4000/api/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "auth-token": localStorage.authToken
    },
    body: JSON.stringify({ name: scaleName, notes: [...selectedNotes] })
  });
};

export const fetchGroups = async (func) => {
  const result = await axios("http://localhost:4000/api/groups", {
    headers: {
      "auth-token": localStorage.authToken
    }
  });

  func(result.data);
};

export const postScaleToNewGroup = (name, selectedNotes, selectedScale) => {
  fetch("http://localhost:4000/api/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "auth-token": localStorage.authToken
    },
    body: JSON.stringify({
      name: name,
      scale: {
        name: selectedScale === 'None' ? 'test scale' : selectedScale,
        notes: selectedNotes
      }
    })
  });
};

export const patchScaleToGroup = (id, selectedNotes, scaleName) => {
  fetch(`http://localhost:4000/api/groups/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "auth-token": localStorage.authToken
    },
    body: JSON.stringify({
      scale: {
        name: scaleName === 'None' ? 'test scale' : scaleName,
        notes: selectedNotes
      }
    })
  });
};

