'use strict';

/**
 * @ngdoc service
 * @name vexTradedeskApp.NewVenture
 * @description
 * # NewVenture
 * Factory in the vexTradedeskApp.
 */
angular.module('vexTradedeskApp')
  .factory('NewVenture', function (ethereum, Contract) {
    // Service logic
    // ...

    var Promise = require('bluebird');
    var contract;
    
    Contract.details('Venture').then(function(c){
      contract = ethereum.web3.eth.contract(JSON.parse(c.abi)).at(c.address);
    }).catch(function(error){
      console.log(error);
    });

    // Public API here
    return {
      deploy : function(name, abi, code, address){
        return new Promise(function(resolve, reject){
          ethereum.web3.eth.contract(JSON.parse(abi)).new(name, 'Technology', {from: address, data : code, gas : 3141592}, 
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
      }
    };
  });
