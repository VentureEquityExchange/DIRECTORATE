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
	    	return $q(function(resolve, reject){
	    		ethereum.listAccounts(function(error, accounts){
		    		if(error){ reject(error); }
		    		scope.accounts = accounts;
		    		resolve(accounts);
		    	});	
	    	})
	    	
	    };

	    scope.listAccounts().then(function(accounts){
	    	if(accounts.length == 0){
	    		scope.newAccount = true;
	    	} else {
	    		scope.newAccount = false;
	    	}
	    }).catch(function(error){
	    	alert(error);
	    });

	    scope.login = function(account){
	    	$rootScope.account = account;
	    	$rootScope.setView('select-venture');
	    }

	    scope.new = function(){
	    	$mdDialog.show({
	            controller : function($scope){
	            	$scope.password = ''
	            	$scope.createAccount = function(password){
	            		ethereum.newAccount(password, function(error, account){
	            			$scope.password = '';
	            			scope.listAccounts().then(function(accounts){
						    	if(accounts.length == 0){
						    		scope.newAccount = true;
						    	} else {
						    		scope.newAccount = false;
						    	}
						    }).catch(function(error){
						    	alert(error);
						    });

						    $mdDialog.hide();
	            		});
	            	}
	            },
	            parent: angular.element(document.body),
	            templateUrl : 'views/newaccount.html',
	            clickOutsideToClose : true

	        });
	    }

      }
    };
  });
