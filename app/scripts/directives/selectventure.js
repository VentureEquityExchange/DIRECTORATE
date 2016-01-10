'use strict';

/**
 * @ngdoc directive
 * @name vexTradedeskApp.directive:selectVenture
 * @description
 * # selectVenture
 */
angular.module('vexTradedeskApp')
  .directive('selectVenture', function (ethereum, DirectorIndex, $rootScope, Contract, $mdDialog) {
    return {
      templateUrl: 'views/selectventure.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        var Promise = require('bluebird');

        scope.loading = true;
        
        DirectorIndex.GetVentures($rootScope.account).then(function(data){
        	console.log(data);
        	scope.loading = false;
        	scope.ventures = data;
        	scope.$apply();
        }).catch(function(error){
        	console.log(error);
        });



        scope.newVenture = function(){
        	$mdDialog.show({
	            controller : function(Contract, DirectorIndex, $rootScope, $scope){
	            	$scope.venture = {};
	            	$scope.createVenture = function(venture){
	            		$rootScope.passwordPrompt().then(function(){
	            			return ethereum.minerStart(2);
	            		}).then(function(data){
	            			console.log(data);
	            			return DirectorIndex.NewDirector($rootScope.account);
	            		}).then(function(data){
							console.log(data);
							return Contract.details('Venture')
	            		}).then(function(contract){
				        	return Contract.deploy(contract.abi, contract.code, $rootScope.account);
					    }).then(function(deployed){
					        console.log(deployed);
					        return DirectorIndex.AddVenture($rootScope.account, deployed.address);
					    }).then(function(data){
					        console.log(data);
					    	return DirectorIndex.GetVentures($rootScope.account);
				        }).then(function(data){
				        	console.log(data);
				        	scope.ventures = [];
				        	scope.ventures = data;
				        	return ethereum.minerStop(2);
				        }).then(function(data){
				        	console.log(data);
				        	scope.$apply();
				        	$mdDialog.hide();
					    }).catch(function(error){
					        console.log(error)
					        if(error.message == "Decryption failed: MAC mismatch"){
					        	alert('Invalid Password');
					        }
					    });	
	            	}
	            	
	            },
	            parent: angular.element(document.body),
	            templateUrl : 'views/newventure.html',
	            clickOutsideToClose : true
	        });
        }




        // utility function for creating new DirectorIndex contract


        function deployDirectorIndex(){
        	$rootScope.passwordPrompt().then(function(){
        		return ethereum.minerStart(2);
        	}).then(function(data){
        		console.log(data);
        		return Contract.details('DirectorIndex');
        	}).then(function(contract){
        		return Contract.deploy(contract.abi, contract.code, $rootScope.account);
        	}).then(function(deployed){
        		return Contract.saveAddress('DirectorIndex', deployed.address);
        	}).then(function(data){
        		console.log(data);
        		return DirectorIndex.NewDirector($rootScope.account);
        	}).then(function(data){
        		console.log(data);
        		return ethereum.minerStop(2);
        	}).then(function(data){
        		console.log(data);
        	}).catch(function(error){
        		console.log(error);
        	});
        }

        // deployDirectorIndex();

      }
    };
  });
