import Promise from 'bluebird';
import * as Network from '../utilities/Network/index';
import * as Accounts from '../utilities/Account/index';

import {
  newAccount,
  listAccounts,
  unlockAccount,
  web3,
  getTransactionByHash,
  minerStart,
  minerStop
} from '../ethereum/index';

import * as Contract from '../utilities/Contract/index';
import * as DAV from '../utilities/Contract/DAV';



// Used to deploy contracts in development

// Promise.delay(5000).then(() => {
//
//   return Contract.compile('DirectorIndex');
//
// }).then((compiled) => {
//
//   console.log(compiled);
//   return unlockAccount("0x34a4d6c830193f0244364a1711b182868c9feda9", "test");
//
// }).then((unlocked) => {
//
//   console.log(unlocked);
//   return minerStart(2);
//
// }).then((data) => {
//
//   console.log(data);
//   return Contract.details('DirectorIndex');
//
// }).then((c) => {
//
//   console.log(Contract);
//   return Contract.deploy(c.abi, c.code, "0x34a4d6c830193f0244364a1711b182868c9feda9");
//
// }).then((deployed) => {
//
//   console.log(deployed);
//   return Contract.saveAddress('DirectorIndex', deployed.address);
//
// }).then((data) => {
//
//   console.log(data);
//   return minerStop(2);
//
// }).then((data) => {
//
//   console.log(data);
// }).catch((error) => {
//   console.log(error);
//   // reject(error);
// });


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

export function MARKET_INSIGHTS(){
  return {
    types : ['MARKET_INSIGHTS_REQUEST', 'MARKET_INSIGHTS_SUCCESS', 'MARKET_INSIGHTS_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
          // need to integration at later point...
          // look for alternative api?
      });
    }
  }
}

export function TRANSACTION_INFO(txhash){
  return {
    types : ['TRANSACTION_INFO_REQUEST', 'TRANSACTION_INFO_SUCCESS', 'TRANSACTION_INFO_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        getTransactionByHash(txhash).then((Transaction) => {
          return resolve(Transaction);
        }).catch((error) => {
          return reject(error);
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

export function GET_VENTURES(Account){
  return {
    types : ['GET_VENTURES_REQUEST', 'GET_VENTURES_SUCCESS', 'GET_VENTURES_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {

        DAV.GetVentures(Account).then((ventures) => {

          return DAV.GetVenturesDetails(ventures);
        }).then((details) => {

          console.log(details);
          resolve(details);

        }).catch((error) => {

          console.log(error);
          reject(error);

        });

      });
    }
  }
}

export function NEW_VENTURE(Account, venture){

  console.log(Account);
  console.log(venture);

  return {
    types : ['NEW_VENTURE_REQUEST', 'NEW_VENTURE_SUCCESS', 'NEW_VENTURE_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        // lets use this action as our entry point into deploying the DAV onto the blockchain.
        // first we need to compile our Directorate contract and deploy, then we need to deploy the bylaws, etc. contracts..

        // this process will include several promises..
        let C = new Object();

        Contract.compile('Directorate').then((compiled) => {

          console.log(compiled);
          return unlockAccount(Account.address, Account.password);

        }).then((unlocked) => {

          console.log(unlocked);
          return minerStart(2);

        }).then((data) => {

          console.log(data);
          return Contract.details('Directorate');

        }).then((c) => {

          console.log(c);

          return DAV.DeployDirectorate(c.abi, c.code, Account.address, venture);

        }).then((deployed) => {
          console.log(deployed);

          return Contract.saveAddress('Directorate', deployed.address);

        }).then((data) => {

          console.log(data);
          return minerStop(2);

        }).then((data) => {

          return Contract.details('Directorate');

        }).then((c) => {
          C = c;
          console.log(c);

          return DAV.AddDirectorToIndex(Account);

        }).then((txhash) => {

          console.log(txhash);

          return DAV.AddVentureToDirectorIndex(Account, C);
        }).then((txhash) => {

          console.log(txhash);
          resolve({name : venture.name, address : C.address});

        }).catch((error) => {

          console.log(error);
          reject(error);

        });


      })
    }
  }
}

export function SEND_TRANSACTION(Account, toAddress, amountEther){
  return {
    types : ['SEND_TRANSACTION_REQUEST', 'SEND_TRANSACTION_SUCCESS', 'SEND_TRANSACTION_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        unlockAccount(Account.address, Account.password).then((unlocked) => {
          if(!unlocked){
            throw unlocked;
          } else {
            web3.eth.sendTransaction({
              from: Account.address,
              to: toAddress,
              value : web3.toWei(amountEther, 'ether')},
                // error, txhash should be callbacks.
                (error, txhash) => {
                  console.log(error); // possible error is not unlocking the account before sending transaction. will get caught in reject.
                  console.log(txhash)
                  if(error){
                    alert(error.message);
                    reject(error)
                  } else {
                    alert(`Transaction successfully sent: ${txhash}`);
                    resolve(txhash);
                  }

            });
          }
        }).catch((error) => {
          reject(error);
        });
      });
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
          console.log(Balance);
          let bigNumber = ['.'];

          switch(Balance.e){
            case -9:
              resolve(Number('.00000000'+Balance.c[0]+''+Balance.c[1]));
            case -8:
              resolve(Number('.0000000'+Balance.c[0]+''+Balance.c[1]));
            case -7:
              resolve(Number('.000000'+Balance.c[0]+''+Balance.c[1]));
            case -6:
              resolve(Number('.00000'+Balance.c[0]+''+Balance.c[1]));
            case -5:
              resolve(Number('.0000'+Balance.c[0]+''+Balance.c[1]));
            case -4:
              resolve(Number('.000'+Balance.c[0]+''+Balance.c[1]));
            case -3:
              resolve(Number('.00'+Balance.c[0]+''+Balance.c[1]));
            case -2:
              resolve(Number('.0'+Balance.c[0]+''+Balance.c[1]));
            case -1:
              resolve(Number('.'+Balance.c[0]+''+Balance.c[1]));
            default:
              resolve(Number(Balance.c[0]+'.'+Balance.c[1]));
          }
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
