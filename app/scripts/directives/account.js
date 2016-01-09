'use strict';

/**
 * @ngdoc directive
 * @name vexTradedeskApp.directive:account
 * @description
 * # account
 */
angular.module('vexTradedeskApp')
  .directive('account', function (ethereum) {
    return {
      templateUrl: 'views/account.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.coinbase = '';
        ethereum.web3.eth.getCoinbase().then(function(coinbase){
        	scope.coinbase = coinbase;
        }).catch(function(error){
          alert(error);
        });
      }
    };
  });
