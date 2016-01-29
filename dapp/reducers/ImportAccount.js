export default function IMPORT_ACCOUNT(state = { Account : { set : null }}, action){

  switch(action.type){
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
    default:
      return state;
  }
}
