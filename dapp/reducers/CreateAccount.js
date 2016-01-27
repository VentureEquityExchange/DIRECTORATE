export default function CREATE_ACCOUNT(state = { Account : {}, set : true }, action){

  switch(action.type){
    case 'SET_ACCOUNT':
      return {
        ...state,
        Account : action.Account,
        set : false
      };
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
    default:
      return state;
  }
}
