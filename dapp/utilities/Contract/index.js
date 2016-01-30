const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const contractsPath = require("path").join(__dirname, "/dapp/contracts/");
const compiler = (contractsPath+'compile.js');
const child = require('child_process').fork(compiler);

import { web3 } from '../../ethereum/index';


export function deploy(abi, code, address){
  return new Promise((resolve, reject) => {
    web3.eth.contract(JSON.parse(abi)).new({from: address, data : code, gas : 3141592},
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

export function details(contract){
  return new Promise((resolve, reject) => {
    Promise.join(
      fs.readFileAsync(contractsPath+contract+'/abi.json', 'utf8'),
      fs.readFileAsync(contractsPath+contract+'/bytecode.txt', 'utf8'),
      fs.readFileAsync(contractsPath+contract+'/address.txt', 'utf8'),
      (abi, code, address) => {
        resolve({abi : abi, code : code, address : address});
      }).catch((error) => {
        reject(error);
      });
  });
}

export function saveAddress(contract, address){
  return new Promise((resolve, reject) => {
    fs.writeFileAsync(contractsPath+contract+'/address.txt', address).then((data) => {
      resolve(data);
    }).catch((error) => {
      reject(error);
    });
  })
}

export function compile(contract){
  return new Promise((resolve, reject) => {
    child.send(contract);

    child.on('message', (compiled) => {
      if(!compiled.abi){reject(compiled);}
      resolve(compiled);
    });
  });
}
