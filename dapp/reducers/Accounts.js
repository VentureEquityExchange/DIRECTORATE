export default function ACCOUNTS(state = { Accounts : [], AllAccounts : [] }, action){
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
    case 'LA_REQUEST':
      return {
        ...state
      };
    case 'LA_SUCCESS':
      return {
        ...state,
        AllAccounts : action.result,
        error : undefined
      };
    case 'LA_FAILURE':
      return {
        ...state,
        error : action.error,
        AllAccounts : undefined
      };
    default:
      return state;
  }
}
