'use strict';

/**
 * @ngdoc directive
 * @name vexTradedeskApp.directive:selectAccount
 * @description
 * # selectAccount
 */
angular.module('vexTradedeskApp')
  .directive('selectAccount', function (ethereum) {
    return {
      templateUrl: 'views/selectaccount.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        scope.accounts = [];
	    scope.listAccounts = function(){
	    	ethereum.listAccounts(function(accounts){
	    		scope.accounts = accounts;
	    	});
	    };

	    scope.listAccounts();
      }
    };
  });
