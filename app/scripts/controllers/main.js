'use strict';
/**
 * @ngdoc function
 * @name vexTradedeskApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vexTradedeskApp
 */
angular.module('vexTradedeskApp')
  .controller('MainCtrl', function ($scope, ethereum, $mdBottomSheet, $mdDialog, $timeout, $mdSidenav, socketio, Contracts, updateDirectorate, Venture) {
    
    setTimeout(function(){
        Venture.create().then(function(venture){
            console.log(venture);
        }).catch(function(error){
            console.log(error);
        });        
    }, 1000);
    
    



    // Create loading window to allow Ethereum node to fully launch.

    $mdDialog.show({
    	parent: angular.element(document.body),
    	templateUrl : 'views/loading.html'
    });

    $timeout(function(){
    	$mdDialog.hide();
        $scope.listAccounts();
    }, 10000)


    $scope.openSearch = function(){
    	$mdBottomSheet.show({
		    template: '<search-ventures></search-ventures>'
		  });
    }
    


    $scope.accounts = [];
    $scope.listAccounts = function(){
    	ethereum.listAccounts(function(accounts){
    		$scope.accounts = accounts;
    	});
    };

    $scope.showAccount = function(){
    	$mdBottomSheet.show({
		    template: '<account></account>'
		  });	
    };
    
  });
