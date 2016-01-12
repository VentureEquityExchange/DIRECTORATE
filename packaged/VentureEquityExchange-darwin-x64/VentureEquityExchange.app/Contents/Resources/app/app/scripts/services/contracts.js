'use strict';

/**
 * @ngdoc service
 * @name vexTradedeskApp.Contracts
 * @description
 * # Contracts
 * Factory in the vexTradedeskApp.
 */
angular.module('vexTradedeskApp')
  .factory('Contract', function ($q, ethereum) {
    // Service logic
    // ...
    // var async = require('async');
    // var db = new PouchDB('contracts');
    var path = require('path');
    var Promise = require('bluebird');
    var fs = Promise.promisifyAll(require('fs'));
    var contractsPath = require("path").join(__dirname, "contracts/");
    var compiler = (contractsPath+'compile.js');
    var child = require('child_process').fork(compiler);
    

    // Public API here
    return {
      deploy : function(abi, code, address){
        return new Promise(function(resolve, reject){
          ethereum.web3.eth.contract(JSON.parse(abi)).new({from: address, data : code, gas : 3141592}, 
            function(error, deployed){
              if(error){reject(error);}
              if(!deployed.address){
                console.log('Waiting for contract transaction '+deployed.transactionHash+' to be mined...');
              } else {
                console.log('Contract mined! Contract Address: '+deployed.address);
                resolve(deployed);      
              }
            });
        });
      },
      details : function(contract){
        return new Promise(function(resolve, reject){
          Promise.join(
            fs.readFileAsync(contractsPath+contract+'/abi.json', 'utf8'), 
            fs.readFileAsync(contractsPath+contract+'/bytecode.txt', 'utf8'),
            fs.readFileAsync(contractsPath+contract+'/address.txt', 'utf8'), function(abi, code, address){
              resolve({abi : abi, code : code, address : address});
            }).catch(function(error){
              reject(error);
            });
        });
      },
      saveAddress : function(contract, address){
        return new Promise(function(resolve, reject){
          fs.writeFileAsync(contractsPath+contract+'/address.txt', address).then(function(data){
            resolve(data);
          }).catch(function(error){
            reject(error);
          });
        })
      },
      compile : function(contract){
        return new Promise(function(resolve, reject){
          child.send(contract);

          child.on('message', function(compiled){
            if(!compiled.abi){reject(compiled);}
            resolve(compiled);
          });
        });
      }
    };
  });
