import Promise from 'bluebird';
import { web3 } from '../../../ethereum/index';
import path from 'path';
import { Compile } from '../../Contract/index';

const fs = Promise.promisifyAll(require('fs'));
const DirectorIndexFolder = (__dirname+'/dapp/utilities/VEX/DirectorIndex/');



// Returns DirectorIndex Contract instance;

export function Instance(){
  return new Promise((resolve, reject) => {
    DirectorIndexDetails().then((c) => {
      let instance = web3.eth.contract(JSON.parse(c.abi)).at(c.address);
      if(!instance){reject(instance)}
      resolve(instance);
    });
  })
}



//
//
// Utility Functions for Developer Issuing DirectorIndex Contract
// Only to be used when developing; otherwise comment out.

export function DirectorIndexDetails(){
  return new Promise((resolve, reject) => {
    Promise.join(
      fs.readFileAsync(DirectorIndexFolder+'/abi.json', 'utf8'),
      fs.readFileAsync(DirectorIndexFolder+'/bytecode.txt', 'utf8'),
      fs.readFileAsync(DirectorIndexFolder+'/address.txt', 'utf8'),
      (abi, code, address) => {
        resolve({abi : abi, code : code, address : address});
      }).catch((error) => {
        reject(error);
      });
  });
}


export function SaveDirectorIndex(DirectorIndex){
  return new Promise((resolve, reject) => {
    Promise.join(
      fs.writeFileAsync(DirectorIndexFolder+'/abi.json', DirectorIndex.interface),
      fs.writeFileAsync(DirectorIndexFolder+'/bytecode.txt', DirectorIndex.bytecode),
      fs.writeFileAsync(DirectorIndexFolder+'/address.txt', DirectorIndex.address),
      (abi, code, address) => {
        resolve(DirectorIndex);
      }).catch((error) => {
        reject(error);
      });
  })
}

export function DeployDirectorIndex(DirectorIndex, Account){
  return new Promise((resolve, reject) => {
    web3.eth.contract(JSON.parse(DirectorIndex.interface)).new({from: Account.address, data : DirectorIndex.bytecode, gas : 3141592},
     (error, deployed) => {
       if(error){reject(error);}
       if(!deployed.address){
         console.log('Waiting for contract transaction '+deployed.transactionHash+' to be mined...');
       } else {
         console.log('Contract mined! Contract Address: '+deployed.address);
         resolve(deployed);
       }
     });
  })
}



export function NewDirectorIndex(Account){
  let DirectorIndex = new Object();
  return new Promise((resolve, reject) => {
    fs.readFileAsync(DirectorIndexFolder+'DirectorIndex.sol', 'utf8').then((source) => {
      return Compile(source);
    }).then((compiled) => {
      DirectorIndex = compiled.contracts['DirectorIndex'];
      console.log(DirectorIndex);
      return DeployDirectorIndex(DirectorIndex, Account);
    }).then((deployed) => {
      DirectorIndex.transactionHash = deployed.transactionHash;
      DirectorIndex.address = deployed.address;
      return SaveDirectorIndex(DirectorIndex);
    }).then((saved) => {
      console.log('New Director Index Contract Saved.');
      console.log(saved);
      resolve(DirectorIndex);
    }).catch((error) => {
      reject(error);
    });
  })
}
