'use strict';

/**
 * @ngdoc directive
 * @name vexTradedeskApp.directive:selectAccount
 * @description
 * # selectAccount
 */
angular.module('vexTradedeskApp')
  .directive('selectAccount', function (ethereum, $rootScope, $q, $mdDialog, Account) {
    return {
      templateUrl: 'views/selectaccount.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        scope.newAccount = false;
        scope.accounts = [];
        $rootScope.account = undefined;

        scope.listAccounts = function(){
	    	// ethereum.listAccounts().then(function(accounts){
	    	// 	scope.accounts = accounts;
	    	// 	if(accounts.length == 0){
		    // 		scope.newAccount = true;
		    // 	} else {
		    // 		scope.newAccount = false;
		    // 	}
		    
	    	// }).catch(function(error){
	    	// 	alert(error);
	    	// });
			Account.getAliases().then(function(aliases){
				for (var i = 0; i < Object.keys(aliases).length; i++) {
					scope.accounts.push({address: Object.keys(aliases)[i], alias : aliases[Object.keys(aliases)[i]]});
				};
				scope.$apply();
			}).catch(function(error){
				console.log(error);
			});
	    };

	    scope.listAccounts();

	    scope.login = function(account){
	    	$rootScope.account = account;
	    	$rootScope.setView('select-venture');
	    }

	    scope.new = function(){
	    	$mdDialog.show({
	            controller : function($scope, Account){
	            	$scope.account = {};
	            	$scope.createAccount = function(account){
	            		ethereum.newAccount(account.password).then(function(address){
	            			scope.accounts.push({address: address, alias : account.alias});
	            			return Account.setAlias(address, account.alias);
	            		}).then(function(data){
	            			console.log(data);
	            			$mdDialog.hide();
	            		}).catch(function(error){
	            			console.log(error);
	            		});
	            	}
	            },
	            parent: angular.element(document.body),
	            templateUrl : 'views/newaccount.html',
	            clickOutsideToClose : true
	        }).then(function(){
				scope.listAccounts();
	        });
	    }

      }
    };
  });
