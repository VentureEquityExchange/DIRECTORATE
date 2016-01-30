export default function VENTURE(state = { Venture : undefined}, action){
  switch(action.type){
    case 'VENTURE_REQUEST':
      return {
        ...state
      };
    case 'VENTURE_SUCCESS':
      console.log(action);
      return {
        ...state,
        Venture : action.result,
        error : undefined
      };
    case 'VENTURE_FAILURE':
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
