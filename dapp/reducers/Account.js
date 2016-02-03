export default function ACCOUNT_REDUCER(state = { Account : { set : false }, Balance : null }, action){

  switch(action.type){
    case 'CR_REQUEST':
      return {
        ...state
      };
    case 'CR_SUCCESS':
      return {
        ...state,
        Account : action.result,
        set : false,
        error : undefined
      };
    case 'CR_FAILURE':
      return {
        ...state,
        error : action.error
      };
    case 'IMPORT_ACCOUNT_SELECTED':
      return {
        ...state,
        Account : action.SelectedAccount
      }
    case 'IMPORT_REQUEST':
      return {
        ...state
      };
    case 'IMPORT_SUCCESS':
      return {
        ...state,
        Account : action.result,
        error : undefined
      };
    case 'IMPORT_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error
      };
    case 'BALANCE_REQUEST':
      return {
        ...state
      };
    case 'BALANCE_SUCCESS':
      return {
        ...state,
        Balance : action.result,
        error : undefined
      };
    case 'BALANCE_FAILURE':
      return {
        ...state,
        error : action.error
      };
    case 'SET_ACCOUNT_REQUEST':
      return {
        ...state
      };
    case 'SET_ACCOUNT_SUCCESS':
      console.log(action.result);
      return {
        ...state,
        Account : action.result,
        error : undefined
      };
    case 'SET_ACCOUNT_FAILURE':
      return {
        ...state,
        Account : undefined,
        error : action.error
      };
    default:
      return state;
  }
}
