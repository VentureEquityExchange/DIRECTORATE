export default function ACCOUNTS(state = { Accounts : [] }, action){

  switch(action.type){
    case 'ACCOUNT_REQUEST':
      return {
        ...state
      };
    case 'ACCOUNT_SUCCESS':
      return {
        ...state,
        Accounts : action.result,
        error : undefined
      };
    case 'ACCOUNT_FAILURE':
      return {
        ...state,
        error : action.error,
        status : undefined
      };
    default:
      return state;
  }
}
