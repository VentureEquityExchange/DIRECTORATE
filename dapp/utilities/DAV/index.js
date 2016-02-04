import Promise from 'bluebird';
const fs = Promise.promisifyAll(require('fs'));

const jsonfile = Promise.promisifyAll(require('jsonfile'));
const DataStore = (require('path').dirname(require.main.filename)+'/dapp/data/');
const ContractStore = DataStore+'.contractstore';

import { web3, unlockAccount, minerStart, minerStop } from '../../ethereum/index';
import { encryptText, decryptText } from '../Account/index';
import * as Contract from '../Contract/index';
import * as DirectorIndex from '../VEX/DirectorIndex/index';
import async from 'async';

/*

These functions handle the deployment of sections of the DAV...


*/


export function DAVContracts(){
  return new Promise((resolve, reject) => {
    let DAV = new Object();
    let contracts = ['Directorate', 'Bylaws', 'Shareholders', 'Directors', 'Voting'];
    async.forEach(contracts, function(contract, cb) {

      fs.readFileAsync(__dirname+'/dapp/utilities/DAV/DAV_Contracts/'+contract+'.sol', 'utf8').then(function(source){
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

export function Directorate(Address){
  return new Promise((resolve, reject) => {
    DAVContracts().then((contracts) => {
      return Contract.Compile(contracts);
    }).then((compiled) => {
      let { Directorate } = compiled.contracts;

      let instance = web3.eth.contract(JSON.parse(Directorate.interface)).at(Address);
      resolve(instance);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function Directors(DirectorsAddress){
  return new Promise((resolve, reject) => {
    DAVContracts().then((contracts) => {
      return Contract.Compile(contracts);
    }).then((compiled) => {
      let { Directors } = compiled.contracts;

      let instance = web3.eth.contract(JSON.parse(Directors.interface)).at(DirectorsAddress);
      resolve(instance);
    }).catch((error) => {
      reject(error);
    });
  });
}


export function NewDAV(Account, venture){
  return new Promise((resolve, reject) => {
    let nDAV = new Object();

    unlockAccount(Account.address, Account.password).then((unlocked) => {
      console.log(unlocked);
      return DAVContracts();

    }).then((DAV) => {

      return Contract.Compile(DAV);
    }).then((compiled) => {

      let { Directorate } = compiled.contracts;

      nDAV.name = venture.name
      nDAV.abi = Directorate.interface;

      return DeployDirectorate(Directorate.interface, Directorate.bytecode, Account.address, venture);
    }).then((deployed) => {
      console.log(deployed);


      nDAV.address = deployed.address;

      return AddDAVToIndex(Account, nDAV);

    }).then((txhash) => {

      resolve({name : venture.name, DAV : nDAV.address});

    }).catch((error) => {
      reject(error);
    });
  });
}

export function AddDAVToIndex(Account, DAV){
  return new Promise((resolve, reject) => {
    DirectorIndex.Instance().then((DI) => {
      DI.AddVenture(DAV.address, {from: Account.address}, (error, txhash) => {
        if(error){reject(error)}
        resolve(txhash);
      });
    });
  });
}

export function GET_DIRECTORS(DirectorsAddress){
  return new Promise((resolve, reject) => {
    Directors(DirectorsAddress).then((D) => {
      D.GetDirectors.call((error, directors) => {
        console.log(error);
        console.log(directors);
        if(error){reject(error)}
        resolve(directors);
      });
    });
  })
}


export function GetVentures(Account){
  return new Promise((resolve, reject) => {
    console.log('Getting DAVs')
    let DAVs = [];
    DirectorIndex.Instance().then((DI) => {
      console.log(DI);
      DI.GetVentures.call(Account.address, (error, ventures) => {
        console.log(ventures);
        if(error){reject(error)}
        async.forEach(ventures, (venture, cb) => {
          Directorate(venture).then((instance) => {
            let Venture = new Object();
            instance.venture.call((error, v) => {
              console.log(v);
              Venture.name = v[0];
              Venture.DAV = v[1];

            });
            instance.contracts.call((error, c) => {
              console.log(c);
              Venture.contract = {
                Bylaws : c[0],
                Shareholders : c[1],
                Directors : c[2],
                Exchange : c[3],
                Voting : c[4]
              }
              DAVs.push(Venture);
              cb();
            })
          });

        }, () => {
          console.log(DAVs)
          resolve(DAVs);
        });

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



export function DeployDirectorate(abi, code, address, venture){
  return new Promise((resolve, reject) => {
    // general deploy method for contracts without instantiating variables...

    web3.eth.contract(JSON.parse(abi)).new(venture.name, venture.directors, {from: address, data : code, gas : 3141592},
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



// Bylaws
// Shareholders
// Exchange
// Voting
