const compiler = ('./compile.js');
const child = require('child_process').fork(compiler);

import Promise from 'bluebird';
const fs = Promise.promisifyAll(require('fs'));

const jsonfile = Promise.promisifyAll(require('jsonfile'));
const DataStore = (require('path').dirname(require.main.filename)+'/dapp/data/');
const ContractStore = DataStore+'.contractstore';

import { web3, unlockAccount, minerStart, minerStop } from '../../ethereum/index';
import * as Contract from '../Contract/index';
import async from 'async';

/*

These functions handle the deployment of sections of the DAV...


*/

export function DAVContracts(){
  return new Promise((resolve, reject) => {
    let DAV = new Object();
    let contracts = ['Directorate', 'Bylaws', 'Shareholders', 'Directors', 'Voting'];
    async.forEach(contracts, function(contract, cb) {

      fs.readFileAsync('./DAV_Contracts/'+contract+'.sol', 'utf8').then(function(source){
        DAV[contract+'.sol'] = source;
        cb();
      }).catch(function(error){
        reject(error);
      });

    }, function(error){
      if(error){reject(error)}
      resolve({sources : DAV});
    });
  });
}


// export function DirectorateContractInstance("0x865f0d1697c617ecb188aeaebf18efc4b67124f2"){
//   return new Promise((resolve, reject) => {
//     fs.readFileAsync(contractsFolder+'/DAV/Directorate.sol', 'utf8').then(function(source){
//       DAV[contract+'.sol'] = source;
//       cb();
//     }).catch(function(error){
//       reject(error);
//     });
//   })
// }

export function SaveDAV(DAV){
  return new Promise((resolve, reject) => {
      Contract.getContractStore().then((store) => {
        store[DAV.address] = DAV;

        return jsonfile.writeFileAsync(ContractStore, store);
      }).then((data) => {
        console.log(data);

        resolve(DAV);
      }).catch((error) => {
        reject(error);
      });
  });
}

export function NewDAV(Account, venture){
  return new Promise((resolve, reject) => {
    let contractStore = new Object();

    unlockAccount(Account.address, Account.password).then((unlocked) => {
      console.log(unlocked);
      return DAVContracts();

    }).then((DAV) => {
      console.log(DAV);
      return Contract.compile(DAV);
    }).then((compiled) => {
      let { Directorate } = compiled.contracts;

      contractStore.name = venture.name;
      contractStore.accountIssuedOn = Account.address;
      // contractStore.contracts = compiled.contracts;
      contractStore.primaryContract = Directorate;

      return DeployDirectorate(Directorate.interface, Directorate.bytecode, Account.address, venture);
    }).then((deployed) => {
      console.log(deployed);
      contractStore.txhash = deployed.transactionHash;
      contractStore.address = deployed.address;

      return SaveDAV(contractStore);
    }).then((DAV) => {

      return AddVentureToDirectorIndex(Account.address, DAV.address);
      // we receive transaction hash from this call..
      // We need to add our directors to our newly made DAV...

      // Going to make some lunch; bbiab..

    }).then((data) => {

      console.log(data);
      resolve({name : contractStore.name, address : contractStore.address});

    }).catch((error) => {
      reject(error);
    });
  });
}

// export function NewVenture(Account, venture){
//   return new Promise((resolve, reject) => {
//     // lets use this action as our entry point into deploying the DAV onto the blockchain.
//     // first we need to compile our Directorate contract and deploy, then we need to deploy the bylaws, etc. contracts..
//
//     // this process will include several promises..
//     let C = new Object();
//
//     Contract.compile('Directorate').then((compiled) => {
//
//       console.log(compiled);
//       return unlockAccount(Account.address, Account.password);
//
//     }).then((unlocked) => {
//
//       console.log(unlocked);
//       return minerStart(2);
//
//     }).then((data) => {
//
//       console.log(data);
//       return Contract.details('Directorate');
//
//     }).then((c) => {
//
//       console.log(c);
//
//       return DeployDirectorate(c.abi, c.code, Account.address, venture);
//
//     }).then((deployed) => {
//       console.log(deployed);
//
//       return Contract.saveAddress('Directorate', deployed.address);
//
//     }).then((data) => {
//
//       console.log(data);
//       return minerStop(2);
//
//     }).then((data) => {
//
//       return Contract.details('Directorate');
//
//     }).then((c) => {
//       C = c;
//       console.log(c);
//
//       return AddDirectorToIndex(Account);
//
//     }).then((txhash) => {
//
//       console.log(txhash);
//
//       return AddVentureToDirectorIndex(Account, C);
//     }).then((txhash) => {
//
//       console.log(txhash);
//
//
//
//       resolve({name : venture.name, address : C.address});
//
//     }).catch((error) => {
//
//       console.log(error);
//       reject(error);
//
//     });
//   });
// }



// GetVentures && GetVentureDetails could be re-written; needs to be.

export function GetVentures(Account){
  console.log(Account);
  return new Promise((resolve, reject) => {


    Contract.details('DirectorIndex').then((c) => {
      console.log(c);
      let DirectorIndex = web3.eth.contract(JSON.parse(c.abi)).at(c.address);
      DirectorIndex.GetVentures.call({from : Account.address}, (error, data) => {
        console.log(data);
        if(error){reject(error)}
        resolve(data);
      });
    }).catch((error) => {
      reject(error);
    });

  });
}

// export function GetVenturesDetails(ventures){
//   let Ventures = [];
//
//   return new Promise((resolve, reject) => {
//     Contract.details('Directorate').then((c) => {
//       // We can use array of ventures addresses to grab venture information;
//
//       async.forEach(ventures, (venture, cb) => {
//         // Here we want to make a call to each venture's directorate contract and pull back venture's details;
//         // venture == address
//         console.log(venture);
//         let Directorate = web3.eth.contract(JSON.parse(c.abi)).at(venture);
//         Directorate.venture.call({from : }(error, v) => {
//
//           // I suspect this will fail because the contract may not send us our struct data object back...
//           // lets find out...
//
//           console.log(error);
//           console.log(v);
//           Ventures.push({name : v[0], address : v[1]});
//           cb();
//         });
//
//       }, (error) => {
//         if(error){reject(error)}
//         resolve(Ventures);
//       });
//
//
//     }).catch((error) => {
//       reject(error);
//     })
//   })
// }

export function AddToDirectorIndex(AccountAddress, VentureAddress){
  return new Promise((resolve, reject) => {
    return AddDirectorToIndex(AccountAddress);
  }).then((txhash) => {
    console.log(txhash);
    return AddVentureToDirectorIndex(AccountAddress, VentureAddress);
  }).then((txhash) => {
    console.log(txhash);
    resolve(true);
  }).catch((error) => {
    reject(error);
  })
}

// export function AddDirectorToIndex(AccountAddress){
//   return new Promise((resolve, reject) => {
//     Contract.details('DirectorIndex').then((c) => {
//       web3.eth.contract(JSON.parse(c.abi)).at(c.address).NewDirector({from : AccountAddress}, (error, data) => {
//
//         console.log(error);
//         console.log(data);
//
//         if(error){reject(error)}
//         resolve(data);
//       });
//     });
//   })
// }

export function AddVentureToDirectorIndex(AccountAddress, VentureAddress){
  return new Promise((resolve, reject) => {
    Contract.details('DirectorIndex').then((c) => {
      web3.eth.contract(JSON.parse(c.abi)).at(c.address).AddVenture(VentureAddress, {from : AccountAddress}, (error, data) => {

        console.log(error);
        console.log(data);

        if(error){reject(error)}
        resolve(data);
      });
    });
  });
}

export function DeployDirectorate(abi, code, address, venture){
  return new Promise((resolve, reject) => {
    // general deploy method for contracts without instantiating variables...

    web3.eth.contract(JSON.parse(abi)).new(venture.name, {from: address, data : code, gas : 3141592},
      (error, deployed) => {
        if(error){reject(error);}
        if(!deployed.address){
          console.log('Waiting for contract transaction '+deployed.transactionHash+' to be mined...');
        } else {
          console.log('Contract mined! Contract Address: '+deployed.address);
          resolve(deployed);
        }
      });
  });
}
