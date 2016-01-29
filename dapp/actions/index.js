import Promise from 'bluebird';
import * as Network from '../utilities/Network/index';
import * as Accounts from '../utilities/Account/index';
import { newAccount, listAccounts, unlockAccount, web3 } from '../ethereum/index';

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

export function LIST_ACCOUNTS(){
  return {
    types : ['LA_REQUEST', 'LA_SUCCESS', 'LA_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        listAccounts().then(accounts => {
          resolve(accounts);
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

export function SIDE_NAV(side, open){
  switch(side){
    case 'left':
      return {
        type : 'LEFT_NAV',
        open : open
      };
    case 'right': {
      return {
        type : 'RIGHT_NAV',
        open : open
      };
    }
  }
}

export function GET_BALANCE(account){
  return {
    types : ['BALANCE_REQUEST', 'BALANCE_SUCCESS', 'BALANCE_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        web3.eth.getBalance(account, (error, balance ) => {
          if(error){reject(error)}
          let Balance = web3.fromWei(balance, 'ether');

          resolve(Number(Balance.c[0]+'.'+Balance.c[1]));
        });
      });
    }
  }
}

export function IMPORT_ACCOUNT(account){
  return {
    types : ['IMPORT_REQUEST', 'IMPORT_SUCCESS', 'IMPORT_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        unlockAccount(account.address, account.password).then(unlocked => {
          account.set = true;
          return Accounts.setAliasStore(JSON.stringify(account));
        }).then(() => {
          console.log('Alias Store Created');
          resolve(account);
          return null;
        }).catch(error => {
          // this throws a warning saying rejecting non-error;
          // no worries, we are handing this error in our Redux.
          // Ignoring the warning.
          reject(error);
          return null;
        });
      });
    }
  }
}

export function SET_ACCOUNT(account){
  return {
    type : 'SET_ACCOUNT',
    Account : account
  }
}

export function GET_ACCOUNTS(){
  return {
    types : ['ACCOUNTS_REQUEST', 'ACCOUNTS_SUCCESS', 'ACCOUNTS_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        Accounts.decryptAliases().then(aliases => {
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
