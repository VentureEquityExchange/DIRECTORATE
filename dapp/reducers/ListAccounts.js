export default function LIST_ACCOUNTS(state = { Accounts : [] }, action){
  switch(action.type){
    case 'LA_REQUEST':
      return {
        ...state
      };
    case 'LA_SUCCESS':
      return {
        ...state,
        Accounts : action.result,
        error : undefined
      };
    case 'LA_FAILURE':
      return {
        ...state,
        error : action.error,
        status : undefined
      };
    default:
      return state;
  }
}
