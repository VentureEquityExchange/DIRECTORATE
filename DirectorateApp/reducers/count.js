import constants from '../constants';

const initialState = {
  number: 1
}

export function update(state = initialState, action) {
  if(action.type === constants.INCREASE) {
    return { number: state.number + action.amount };
  }
  else if(action.type === constants.DECREASE) {
    return { number: state.number - action.amount };
  }
  return state;
}
