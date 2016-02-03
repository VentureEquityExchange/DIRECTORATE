export default function DIRECTOR_INDEX(state = { DirectorIndex : {} }, action){
  switch(action.type){
    case 'NEW_DIRECTOR_INDEX_REQUEST':
      return {
        ...state
      };
    case 'NEW_DIRECTOR_INDEX_SUCCESS':
      return {
        ...state,
        DirectorIndex : action.result,
        error : undefined
      };
    case 'NEW_DIRECTOR_INDEX_FAILURE':
      return {
        ...state,
        error : action.error,
        DirectorIndex : undefined
      };
    default:
      return state;
  }
}
