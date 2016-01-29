export default function SIDE_NAVIGATION(state = { left : false, right : false }, action){
  switch(action.type){
    case 'LEFT_NAV':
      return {
        ...state,
        left : action.open
      };
    case 'RIGHT_NAV':
      return {
        ...state,
        right : action.open
      };
    default:
      return state;
  }
}
