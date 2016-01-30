export default function TRANSACTIONS(state = { Transaction : undefined, txhash : null}, action){
  switch(action.type){
    case 'TRANSACTION_INFO__REQUEST':
      return {
        ...state,
        txhash : null
      };
    case 'TRANSACTION_INFO__SUCCESS':
      console.log(action);
      return {
        ...state,
        Transaction : action.result,
        txhash : null,
        error : undefined
      };
    case 'TRANSACTION_INFO__FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        Transaction : undefined,
        txhash : null,
      };
    case 'SEND_TRANSACTION_REQUEST':
      return {
        ...state
      };
    case 'SEND_TRANSACTION_SUCCESS':
      return {
        ...state,
        txhash : action.result,
        error : undefined
      };
    case 'SEND_TRANSACTION_FAILURE':
      return {
        ...state,
        error : action.error,
        txhash : undefined
      };
    default:
      return state;
  }
}
