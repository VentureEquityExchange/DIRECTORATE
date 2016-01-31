const Promise = require('bluebird');
import { web3 } from '../../ethereum/index';
import * as Contract from './index';
import async from 'async';

/*

These functions handle the deployment of sections of the DAV....


*/

export function GetVentures(Account){
  console.log(Account);
  return new Promise((resolve, reject) => {
    Contract.details('DirectorIndex').then((c) => {
      let DirectorIndex = web3.eth.contract(JSON.parse(c.abi)).at(c.address);
      DirectorIndex.GetVentures.call({from : Account.address}, (error, data) => {
        if(error){reject(error)}
        resolve(data);
      });
    }).catch((error) => {
      reject(error);
    });
  });
}

export function GetVenturesDetails(ventures){
  let Ventures = [];

  return new Promise((resolve, reject) => {
    Contract.details('Directorate').then((c) => {
      // We can use array of ventures addresses to grab venture information;

      async.forEach(ventures, (venture, cb) => {
        // Here we want to make a call to each venture's directorate contract and pull back venture's details;
        // venture == address
        console.log(venture);
        let Directorate = web3.eth.contract(JSON.parse(c.abi)).at(venture);
        Directorate.venture.call((error, v) => {

          // I suspect this will fail because the contract may not send us our struct data object back...
          // lets find out...

          console.log(error);
          console.log(v);
          Ventures.push({name : v[0], address : v[1]});
          cb();
        });

      }, (error) => {
        if(error){reject(error)}
        resolve(Ventures);
      });


    }).catch((error) => {
      reject(error);
    })
  })
}

export function AddDirectorToIndex(Account){
  return new Promise((resolve, reject) => {
    Contract.details('DirectorIndex').then((c) => {
      web3.eth.contract(JSON.parse(c.abi)).at(c.address).NewDirector({from : Account.address}, (error, data) => {

        console.log(error);
        console.log(data);

        if(error){reject(error)}
        resolve(data);
      });
    });
  })
}

export function AddVentureToDirectorIndex(Account, venture){
  return new Promise((resolve, reject) => {
    Contract.details('DirectorIndex').then((c) => {
      web3.eth.contract(JSON.parse(c.abi)).at(c.address).AddVenture(venture.address, {from : Account.address}, (error, data) => {

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
