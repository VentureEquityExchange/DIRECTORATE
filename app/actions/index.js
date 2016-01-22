import { NETWORK, SYNCING, ERROR } from './types';


export function _NETWORK(status){
  return {
    type : NETWORK,
    network : status
  }
}

export function _SYNCING(status){
  return {
    type : SYNCING,
    loading : status
  }
}

export function _ERROR(status){
  return {
    type: status.code,
    error: status
  }
}
