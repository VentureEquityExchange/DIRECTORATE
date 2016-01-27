export default function ACCOUNTS(state = { Accounts : [] }, action){
  switch(action.type){
    case 'ACCOUNTS_REQUEST':
      return {
        ...state
      };
    case 'ACCOUNTS_SUCCESS':
      return {
        ...state,
        Accounts : action.result,
        error : undefined
      };
    case 'ACCOUNTS_FAILURE':
      return {
        ...state,
        error : action.error,
        status : undefined
      };
    default:
      return state;
  }
}
