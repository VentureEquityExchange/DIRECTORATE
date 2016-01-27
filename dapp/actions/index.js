import Promise from 'bluebird';
import * as Network from '../utilities/Network/index';
import * as Accounts from '../utilities/Account/index';
import { newAccount } from '../ethereum/index';

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

export function CREATE_ACCOUNT(account){

  return {
    types : ['CR_REQUEST', 'CR_SUCCESS', 'CR_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        newAccount(account.password).then((address) => {
           account.address = address;
           account.set = true;
           return Accounts.setAliasStore(JSON.stringify(account));
        }).then(() => {
          console.log('Account Created');
          resolve(account);
        }).catch((error) => {
          reject(error)
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
    types : ['ACCOUNTS_REQUEST', 'ACCOUNTS_SUCCESS', 'ACCOUNTS_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        Accounts.decryptAliases().then(aliases => {
          console.log(aliases);
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
