export default function MARKET_INSIGHTS(state = { Medium : {}, Twitter : {}}, action){
  switch(action.type){
    case 'MARKET_INSIGHTS_REQUEST':
      return {
        ...state
      };
    case 'MARKET_INSIGHTS_SUCCESS':
      console.log(action);
      return {
        ...state,
        Medium : action.result.Medium,
        Twitter : action.result.Twitter,
        error : undefined
      };
    case 'MARKET_INSIGHTS_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        Medium : undefined,
        Twitter : undefined,
      };
    default:
      return state;
  }
}
