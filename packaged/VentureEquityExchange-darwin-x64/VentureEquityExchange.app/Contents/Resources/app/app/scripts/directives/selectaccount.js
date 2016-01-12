'use strict';

/**
 * @ngdoc directive
 * @name vexTradedeskApp.directive:selectAccount
 * @description
 * # selectAccount
 */
angular.module('vexTradedeskApp')
  .directive('selectAccount', function (ethereum, $rootScope, $q, $mdDialog) {
    return {
      templateUrl: 'views/selectaccount.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        scope.newAccount = false;
        scope.accounts = [];
        
        scope.listAccounts = function(){
	    	ethereum.listAccounts().then(function(accounts){
	    		scope.accounts = accounts;
	    		if(accounts.length == 0){
		    		scope.newAccount = true;
		    	} else {
		    		scope.newAccount = false;
		    	}
		    	scope.$apply();
	    	}).catch(function(error){
	    		alert(error);
	    	});	
	    };

	    scope.listAccounts();

	    scope.login = function(account){
	    	$rootScope.account = account;
	    	$rootScope.setView('select-venture');
	    }

	    scope.new = function(){
	    	$mdDialog.show({
	            controller : function($scope){
	            	$scope.password = '';
	            	$scope.createAccount = function(password){
	            		ethereum.newAccount(password).then(function(account){
	            			scope.accounts.push(account);
	            			$mdDialog.hide(account);
	            		}).catch(function(error){
	            			console.log(error);
	            		});
	            	}
	            },
	            parent: angular.element(document.body),
	            templateUrl : 'views/newaccount.html',
	            clickOutsideToClose : true
	        }).then(function(account){
				alert('Created Account: '+account)
	        });
	    }

      }
    };
  });
