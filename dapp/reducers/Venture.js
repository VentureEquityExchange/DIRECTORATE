export default function VENTURE(state = { Ventures : undefined}, action){
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
        Ventures : undefined
      };
    case 'VENTURE_REQUEST':
      return {
        ...state
      };
    case 'VENTURE_SUCCESS':
      console.log(action);
      return {
        ...state,
        Ventures : action.result,
        error : undefined
      };
    case 'VENTURE_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        Ventures : undefined
      };
    default:
      return state;
  }
}
