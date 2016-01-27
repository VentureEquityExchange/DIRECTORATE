import Promise from 'bluebird';
import * as Network from '../utilities/Network/index';
import * as Accounts from '../utilities/Account/index';

export function _NETWORK(){
  return {
    types : ['NETWORK_REQUEST', 'NETWORK_SUCCESS', 'NETWORK_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        Network.getStatus().then(status => {
          resolve(status);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
}

export function _ACCOUNT(account){
  return {
    type : 'SET_ACCOUNT',
    Account : account
  }
}

export function _ACCOUNTS(){
  return {
    types : ['ACCOUNT_REQUEST', 'ACCOUNT_SUCCESS', 'ACCOUNT_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        Accounts.getAliasStore().then(aliases => {
          resolve(aliases);
        }).catch(error => {
          reject(error);
        });
      });
    }
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
