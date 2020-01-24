import { notes, scales } from '../data';

let iteration = 0;

function limitIterationsOfPrevStateInPrevState(previousState) {
  // separate prevState from the rest of state
  const obj = () => {
    const { prevState, ...rest } = previousState;
    return { prevState: prevState, rest: rest }
  }

  // omit 2nd level prevState key
  const { prevState: omitted, ...rest} = obj().prevState;

  // combine them
  return { ...obj().rest, prevState: rest }
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
    }
  }
}

export function updateFretMap(tuning, frets) {
  const openIdx = openNote => +Object.keys(notes).find(key => notes[key] === openNote);

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
  }

  return frets.map(fret => {
    let [ str, strNum, fr, frNum, note ] = fret.split("-");

    note = notes[noteIdx(+frNum,notes[openIdx(tuning[strNum - 1])])];

    return `${str}-${strNum}-${fr}-${frNum}-${note}`;
  });
}

export const selectedNoteIndices = (scale, root, selectedFrets) => scales[scale].map(i => {
  const rootIdx = Object.values(notes).indexOf(root);
  const idx = i + rootIdx < 12 ? i + rootIdx : i + rootIdx - 12;

  return [
    idx,
    selectedFrets.map(fret => fret.split('-')[4]).filter(note => notes[idx] === note).length
  ];
});
