import { notes } from '../data';

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
  const noteIdx = (fIdx, openNote) => openIdx(openNote) + fIdx - 12 * Math.floor((openIdx(openNote) + fIdx)/12);

  return frets.map(fret => {
    let [ str, strNum, fr, frNum, note ] = fret.split("-");
    note = notes[noteIdx(+frNum,notes[openIdx(tuning[strNum - 1])])];

    return `${str}-${strNum}-${fr}-${frNum}-${note}`;
  });
}
