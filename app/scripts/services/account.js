'use strict';

/**
 * @ngdoc service
 * @name vexTradedeskApp.account
 * @description
 * # account
 * Factory in the vexTradedeskApp.
 */
angular.module('vexTradedeskApp')
  .factory('Account', function () {
    // Service logic
    // ...

    var Promise = require('bluebird');
    var fs = Promise.promisifyAll(require('fs'));
    var AliasesJSON = require('path').join(__dirname, '/data/AccountAliases.json');
    var jsonfile = Promise.promisifyAll(require('jsonfile'));

    // Public API here
    return {
      getAliases: function () {
        return new Promise(function(resolve, reject){
          jsonfile.readFileAsync(AliasesJSON).then(function(aliases){
            resolve(aliases);
          }).catch(function(error){
            reject(error);
          });
        })
      },
      setAlias: function(address, alias){
        return new Promise(function(resolve, reject){
          jsonfile.readFileAsync(AliasesJSON).then(function(aliases){
            aliases[address] = alias;
            console.log(aliases);
            return jsonfile.writeFileAsync(AliasesJSON, aliases);
          }).then(function(data){
            resolve(data);
          }).catch(function(error){
            reject(error);
          })
        });
      }
    };
  });
