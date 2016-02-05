export default function SIDE_NAVIGATION(state = { left : false, right : false, view : 'Bylaws' }, action){
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

    case 'SET_DASHVIEW':
      return {
        ...state,
        view : action.result
      };
    default:
      return state;
  }
}
