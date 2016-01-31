export default function CREATE_ACCOUNT(state = { Account : { set : null }, set : true, }, action){

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
    default:
      return state;
  }
}
