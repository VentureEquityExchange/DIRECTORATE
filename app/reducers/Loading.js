import { LOADING, NETWORK, ERROR} from '../actions/types';

const initialState = {
  loading: true
}

function Loading(state = initialState, action) {
  switch(action.type){
    case LOADING:
      return action.state;
    default:
      return state;
  }
}

export { Loading }
