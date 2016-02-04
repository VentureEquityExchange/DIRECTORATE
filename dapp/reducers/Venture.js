export default function VENTURE(state = { Ventures : undefined, Venture : undefined, Directors : [], compiled : false }, action){
  switch(action.type){
    case 'COMPILE_DAV_REQUEST':
      return {
        ...state
      };
    case 'COMPILE_DAV_SUCCESS':
      console.log(action);
      return {
        ...state,
        compiled : action.result,
        error : undefined
      };
    case 'COMPILE_DAV_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        compiled : false
      };
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
        Ventures : undefined
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
        Venture : action.result,
        error : undefined
      };
    case 'NEW_VENTURE_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        Venture : undefined
      };
    case 'RESET_VENTURES':
      console.log(action);
      return {
        ...state,
        Venture : undefined,
        Ventures : undefined,
        error : undefined
      };
    case 'SELECTED_VENTURE':
      console.log(action);
      return {
        ...state,
        Venture : action.result,
        error : undefined
      };
    case 'DAV_DIRECTORS_REQUEST':
      return {
        ...state
      };
    case 'DAV_DIRECTORS_SUCCESS':
      console.log(action);
      return {
        ...state,
        Directors : action.result,
        error : undefined
      };
    case 'DAV_DIRECTORS_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        Directors : undefined
      };
    default:
      return state;
  }
}
