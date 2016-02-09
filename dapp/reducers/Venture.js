const DEFAULT_VENTURE_STATE = {
  Ventures : undefined,
  Venture : undefined,
  Directors : [],
  Resolutions : {
    open : [],
    all : []
  },
  Bylaws : {},
  compiled : false,
  BylawsChanged : undefined
};


export default function VENTURE(state = DEFAULT_VENTURE_STATE, action){
  switch(action.type){
    case 'COMPILE_DAV_REQUEST':
      return {
        ...state
      };
    case 'COMPILE_DAV_SUCCESS':
      console.log(action);
      return {
        ...state,
        compiled : action.result,
        error : undefined
      };
    case 'COMPILE_DAV_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        compiled : false
      };
    case 'GET_VENTURES_REQUEST':
      return {
        ...state
      };
    case 'GET_VENTURES_SUCCESS':
      console.log(action);
      return {
        ...state,
        Ventures : action.result,
        error : undefined
      };
    case 'GET_VENTURES_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        Ventures : undefined
      };
    case 'NEW_VENTURE_REQUEST':
      return {
        ...state
      };
    case 'NEW_VENTURE_SUCCESS':
      console.log(action);
      return {
        ...state,
        Ventures : state.Ventures.concat(action.result),
        Venture : action.result,
        error : undefined
      };
    case 'NEW_VENTURE_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        Venture : undefined
      };
    case 'RESET_VENTURES':
      console.log(action);
      return {
        ...state,
        Venture : undefined,
        Ventures : undefined,
        error : undefined
      };
    case 'SELECTED_VENTURE':
      console.log(action);
      return {
        ...state,
        Venture : action.result,
        error : undefined
      };
    case 'GET_BYLAWS_REQUEST':
      return {
        ...state
      };
    case 'GET_BYLAWS_SUCCESS':
      console.log(action);
      return {
        ...state,
        Bylaws : action.result,
        error : undefined
      };
    case 'GET_BYLAWS_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        Bylaws : undefined
      };
    case 'DAV_DIRECTORS_REQUEST':
      return {
        ...state
      };
    case 'DAV_DIRECTORS_SUCCESS':
      console.log(action);
      return {
        ...state,
        Directors : action.result,
        error : undefined
      };
    case 'DAV_DIRECTORS_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        Directors : undefined
      };
    case 'GET_SHAREHOLDERS_REQUEST':
      return {
        ...state
      };
    case 'GET_SHAREHOLDERS_SUCCESS':
      console.log(action);
      return {
        ...state,
        Shareholders : action.result,
        error : undefined
      };
    case 'GET_SHAREHOLDERS_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        Shareholders : undefined
      };
    case 'AMEND_BYLAWS_REQUEST':
      return {
        ...state
      };
    case 'AMEND_BYLAWS_SUCCESS':
      console.log(action);
      return {
        ...state,
        BylawsChanged : action.result,
        error : undefined
      };
    case 'AMEND_BYLAWS_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error,
        BylawsChanged : undefined
      };
    case 'GET_OPEN_RESOLUTIONS_REQUEST':
      return {
        ...state
      };
    case 'GET_OPEN_RESOLUTIONS_SUCCESS':
      console.log(action);
      return {
        ...state,
        Resolutions : {
          open : action.result
        }
      };
    case 'GET_OPEN_RESOLUTIONS_FAILURE':
      console.log(action);
      return {
        ...state,
        error : action.error
      };
    default:
      return state;
  }
}
