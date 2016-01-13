'use strict';

/**
 * @ngdoc directive
 * @name vexTradedeskApp.directive:selectVenture
 * @description
 * # selectVenture
 */
angular.module('vexTradedeskApp')
  .directive('selectVenture', function (ethereum, DirectorIndex, $rootScope, Contract, $mdDialog, Venture) {
    return {
      templateUrl: 'views/selectventure.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        var Promise = require('bluebird');
        var Async = require('async');
        var HexConversion = require('binstring');

        scope.loading = true;
        scope.ventures = [];
        
        function getVentures(){
        	console.log($rootScope.account.address);
        	DirectorIndex.GetVentures($rootScope.account.address).then(function(ventures){
	        	Async.each(ventures, function(venture, cb){
	        		var V = {};
	        		var Instance;
	        		V.address = venture;
	        		Venture.instance(venture).then(function(instance){
	        			Instance = instance;
	        			return Venture.name(Instance);
	        		}).then(function(name){
	        			V.name = name;
	        			return Venture.industry(Instance);
	        		}).then(function(industry){
	        			V.industry = HexConversion(industry, { out : 'utf8'});
	        			scope.ventures.push(V);
	        			cb();
	        		}).catch(function(error){
	        			console.log(error);
	        			cb(error);
	        		});
	        	}, function(error){
	        		if(error){console.log(error)};
	        		console.log(scope.ventures);
	        		scope.loading = false;
	        		scope.$apply();
	        	});
	        }).catch(function(error){
	        	console.log(error);
	        });	
        };

        getVentures();
        



        scope.newVenture = function(){
        	$mdDialog.show({
	            controller : function(NewVenture, Contract, DirectorIndex, $rootScope, $scope){
	            	$scope.venture = {};
	            	$scope.createVenture = function(venture){
	            		$rootScope.passwordPrompt().then(function(){
	            			return ethereum.minerStart(2);
	            		}).then(function(data){
	            			console.log(data);
	            			return DirectorIndex.NewDirector($rootScope.account.address);
	            		}).then(function(data){
							console.log(data);
							return Contract.compile('Venture');
						}).then(function(compiled){
							console.log(compiled);
							return Contract.details('Venture')
	            		}).then(function(contract){
				        	return NewVenture.deploy($scope.venture, contract.abi, contract.code, $rootScope.account.address);
					    }).then(function(deployed){
					        console.log(deployed);
					        scope.ventures.push({address : deployed.address, name : $scope.venture.name});
					        return DirectorIndex.AddVenture($rootScope.account.address, deployed.address);
					    }).then(function(data){
					        console.log(data);
					    	return DirectorIndex.GetVentures($rootScope.account.address);
				        }).then(function(data){
				        	console.log(data);
				        	
				        	return ethereum.minerStop(2);
				        }).then(function(data){
				        	console.log(data);
				        	scope.$apply();
				        	$mdDialog.hide();
					    }).catch(function(error){
					        console.log(error);
					        if(error.message == "Decryption failed: MAC mismatch"){
					        	alert('Invalid Password');
					        	$scope.createVenture($scope.venture);
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
        		return Contract.compile("DirectorIndex");
        	}).then(function(compiled){
        		console.log(compiled);
        		return Contract.details('DirectorIndex');
        	}).then(function(contract){
        		return Contract.deploy(contract.abi, contract.code, $rootScope.account.address);
        	}).then(function(deployed){
        		return Contract.saveAddress('DirectorIndex', deployed.address);
        	}).then(function(data){
        		console.log(data);
        		return DirectorIndex.NewDirector($rootScope.account.address);
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
