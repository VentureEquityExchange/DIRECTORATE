export default function VENTURE(state = { Ventures : [], Venture : undefined }, action){
  switch(action.type){
    case 'GET_VENTURES_REQUEST':
      return {
        ...state
      };
    case 'GET_VENTURES_SUCCESS':
      console.log(action);
      return {
        ...state,
        Ventures : action.result,
        error : undefined
      };
    case 'GET_VENTURES_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        Ventures : []
      };
    case 'NEW_VENTURE_REQUEST':
      return {
        ...state
      };
    case 'NEW_VENTURE_SUCCESS':
      console.log(action);
      return {
        ...state,
        Ventures : state.Ventures.concat(action.result),
        error : undefined
      };
    case 'NEW_VENTURE_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        Venture : undefined
      };
    default:
      return state;
  }
}
