export default function SET_ACCOUNT(state = { Account : { set : null }}, action){

  switch(action.type){
    // should separate SET_ACCOUNT as standalone, separating concerns of other reducers...
    case 'SET_ACCOUNT':
      return {
        ...state,
        Account : action.Account,
        error : undefined
      };
    default:
      return state;
  }
}
