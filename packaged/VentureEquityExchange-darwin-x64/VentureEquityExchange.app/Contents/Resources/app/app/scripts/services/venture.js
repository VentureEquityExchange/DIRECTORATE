'use strict';

/**
 * @ngdoc service
 * @name vexTradedeskApp.Venture
 * @description
 * # Venture
 * Factory in the vexTradedeskApp.
 */
angular.module('vexTradedeskApp')
  .factory('Venture', function (registrar, Contract, ethereum, $q) {
    // Service logic
    // ...
    var Promise = require('bluebird');
    
    // Public API here
    return {
      instance : function(address){
        return new Promise(function(resolve, reject){
          Contract.details('Venture').then(function(c){
            var contract = ethereum.web3.eth.contract(JSON.parse(c.abi)).at(address);
            resolve(contract);
          }).catch(function(error){
            reject(error);
          });
        })
      },
      name: function (venture) {
        // Note: venture == instance of venture contract
        return new Promise(function(resolve, reject){
          venture.name.call(function(error, name){
            if(error){reject(error);}
            resolve(name);
          });
        });
      },
      industry : function(venture){
        return new Promise(function(resolve, reject){
          venture.industry.call(function(error, industry){
            if(error){reject(error);}
            resolve(industry);
          });
        });
      }
    };
  });
