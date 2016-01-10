'use strict';

/**
 * @ngdoc service
 * @name vexTradedeskApp.DirectorIndex
 * @description
 * # DirectorIndex
 * Factory in the vexTradedeskApp.
 */
angular.module('vexTradedeskApp')
  .factory('DirectorIndex', function (ethereum, Contract, $rootScope) {
    // Service logic
    // ...
    var Promise = require('bluebird');
    var contract;
    
    Contract.details('DirectorIndex').then(function(c){
      contract = ethereum.web3.eth.contract(JSON.parse(c.abi)).at(c.address);
    }).catch(function(error){
      console.log(error);
    });

    // Public API here
    return {
      GetVentures: function (director) {
        return new Promise(function(resolve, reject){
          contract.GetVentures.call(director, function(error, ventures){
            if(error){reject(error);}
            resolve(ventures);
          });
        })
      }
    };
  });
