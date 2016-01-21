import constants from '../constants';

export function network(state = {}, { status }){
  switch(constants.NETWORK){
    case 'NETWORK':
      return status;
    default:
      return state;
  }
}
