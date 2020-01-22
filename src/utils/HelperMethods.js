export function updateState(state, obj) {
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
