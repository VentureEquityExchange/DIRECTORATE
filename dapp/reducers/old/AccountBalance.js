export default function ACCOUNT_BALANCE(state = { Balance : null }, action){

  switch(action.type){
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
    default:
      return state;
  }
}
