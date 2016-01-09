'use strict';

/**
 * @ngdoc service
 * @name vexTradedeskApp.Contracts
 * @description
 * # Contracts
 * Factory in the vexTradedeskApp.
 */
angular.module('vexTradedeskApp')
  .factory('Contracts', function ($q, ethereum) {
    // Service logic
    // ...
    // var async = require('async');
    // var db = new PouchDB('contracts');
    var path = require('path');
    var Promise = require('bluebird');
    var fs = Promise.promisifyAll(require('fs'));
  
    // var GitHubApi = require('github');
    // var github = new GitHubApi({
    //     // required 
    //     version: "3.0.0",
    //     // optional 
    //     debug: true,
    //     protocol: "https",
    //     host: "api.github.com",
    //     pathPrefix: "",
    //     timeout: 5000,
    //     headers: {
    //         "user-agent": "vex-directorate"
    //     }
    // });

    // // Authenticate github
    // fs.readFileAsync(__dirname+'/.token', 'utf8').then(function(token){
    //   github.authenticate({
    //       type: "oauth",
    //       token: token
    //   });
    // });

    // github.repo.get({

    // })

    // var contractsRepo = "https://github.com/VentureEquityExchange/Directorate-Contracts.git";
    // var contractsPath = require("path").join(__dirname, "contracts");
    
    

    // Public API here
    return {
      deploy : function(abi, code, address, password){
        return new Promise(function(resolve, reject){
          ethereum.unlockAccount(address, password).then(function(result){
            alert(result);
          }).catch(function(error){
            alert(error);
          });
        });
      },
      contractDetails : function(contract){
        return new Promise(function(resolve, reject){

        })
      }
    };
  });
