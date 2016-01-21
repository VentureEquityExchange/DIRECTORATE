import { NETWORK, LOADING, ERROR } from './types';


export function _NETWORK(status){
  return {
    type : NETWORK,
    network : status
  }
}

export function _LOADING(status){
  return {
    type : LOADING,
    loading : status
  }
}

export function _ERROR(status){
  return {
    type: ERROR,
    error: status
  }
}
