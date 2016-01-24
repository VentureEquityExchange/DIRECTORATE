export default function NETWORK(state = { pending : false }, action){
  switch(action.type){
    case 'NETWORK_REQUEST':
      return {
        ...state,
        pending: true
      };
    case 'NETWORK_SUCCESS':
      return {
        ...state,
        status : action.result,
        error : undefined,
        pending: false
      };
    case 'NETWORK_FAILURE':
      return {
        ...state,
        error : action.error,
        status : undefined,
        pending: false
      };
    default:
      return state;
  }
}
