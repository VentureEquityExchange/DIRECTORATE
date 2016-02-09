import Promise from 'bluebird';
import * as Network from '../utilities/Network/index';
import { decryptAliases, setAliasStore, getBalance, importAccount } from '../utilities/Account/index';
import * as Contract from '../utilities/Contract/index';
import * as DAV from '../utilities/DAV/index';
import * as DirectorIndex from '../utilities/VEX/DirectorIndex/index';


import {
  newAccount,
  listAccounts,
  unlockAccount,
  web3,
  getTransactionByHash,
  minerStart,
  minerStop,
  setEtherbase
} from '../ethereum/index';



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
           return setAliasStore(JSON.stringify(account));
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
          console.log(ventures);
          resolve(ventures);
        }).catch((error) => {
          console.log(error);
          reject(error);
        });

      });
    }
  }
}

export function SELECT_VENTURE(venture){
  return {
    type : 'SELECTED_VENTURE',
    result : venture
  }
}

export function COMPILE_DAV(){
  return {
    types : ['COMPILE_DAV_REQUEST', 'COMPILE_DAV_SUCCESS', 'COMPILE_DAV_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        DAV.COMPILE_DAV().then((compiled) => {
          resolve(compiled);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  }
}

export function DAV_DIRECTORS(DirectorAddress){
  return {
    types : ['DAV_DIRECTORS_REQUEST', 'DAV_DIRECTORS_SUCCESS', 'DAV_DIRECTORS_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        DAV.GET_DIRECTORS(DirectorAddress).then((directors) => {
          resolve(directors);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  }
}

export function GET_BYLAWS(venture){
  return {
    types : ['GET_BYLAWS_REQUEST', 'GET_BYLAWS_SUCCESS', 'GET_BYLAWS_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        DAV.GET_BYLAWS(venture).then((bylaws) => {
          resolve(bylaws);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  }
}

export function GET_SHAREHOLDERS(venture){
  return {
    types : ['GET_SHAREHOLDERS_REQUEST', 'GET_SHAREHOLDERS_SUCCESS', 'GET_SHAREHOLDERS_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        DAV.GET_SHAREHOLDERS(venture).then((shareholders) => {
          resolve(shareholders);
        }).catch((error) => {
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
        DAV.NewDAV(Account, venture).then((venture) => {
          resolve(venture)
        }).catch((error) => {
          reject(error);
        });
      });
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
        console.log(account);
        getBalance(account).then((balance) => {
          console.log(balance);
          resolve(balance);
        }).catch((error) => {
          reject(error);
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
        importAccount(account).then((account) => {
          resolve(account);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  }
}

export function IMPORT_ACCOUNT_SELECTED(account){
  console.log(account);
  return {
    type : 'IMPORT_ACCOUNT_SELECTED',
    SelectedAccount : account
  }
}

export function RESET_VENTURES(){
  return {
    type : 'RESET_VENTURES',
    action : {}
  }
}

export function SET_ACCOUNT(account){
  console.log(account);
  return {
    types : ['SET_ACCOUNT_REQUEST', 'SET_ACCOUNT_SUCCESS', 'SET_ACCOUNT_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        if(account.address == undefined){
          resolve(account);
        } else {
          setEtherbase(account.address).then((set) => {
            resolve(account);
          }).catch((error) => {
            reject(error);
          });
        }
      });
    }
  }
}

export function SET_DASHVIEW(view){
  return {
    type : 'SET_DASHVIEW',
    result : view
  }
}

export function AMEND_BYLAWS(Account, newBylawResolution){
  return {
    types : ['AMEND_BYLAWS_REQUEST', 'AMEND_BYLAWS_SUCCESS', 'AMEND_BYLAWS_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        DAV.AMEND_BYLAWS(Account, newBylawResolution).then((txhash) => {
          resolve(txhash);
        }).catch((error) => {
          reject(error)
        });
      });
    }
  }
}

export function GET_OPEN_RESOLUTIONS(venture){
  return {
    types : ['GET_OPEN_RESOLUTIONS_REQUEST', 'GET_OPEN_RESOLUTIONS_SUCCESS', 'GET_OPEN_RESOLUTIONS_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        DAV.GET_OPEN_RESOLUTIONS(venture).then((resolutions) => {
          resolve(resolutions);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  }
}

export function GET_ACCOUNTS(){
  return {
    types : ['ACCOUNTS_REQUEST', 'ACCOUNTS_SUCCESS', 'ACCOUNTS_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        decryptAliases().then((aliases) => {
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

export function NEW_DIRECTOR_INDEX(account){
  let DI = new Object();
  return {
    types : ['NEW_DIRECTOR_INDEX_REQUEST', 'NEW_DIRECTOR_INDEX_SUCCESS', 'NEW_DIRECTOR_INDEX_FAILURE'],
    promise : () => {
      return new Promise((resolve, reject) => {
        unlockAccount(account.address, account.password).then((unlocked) => {
          return minerStart(2);
        }).then((miningStarted) => {
          return DirectorIndex.NewDirectorIndex(account);
        }).then((DirectorIndex) => {
          DI = DirectorIndex;
          return minerStop(2);
        }).then((miningStopped) => {
          resolve(DI);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  }
}
