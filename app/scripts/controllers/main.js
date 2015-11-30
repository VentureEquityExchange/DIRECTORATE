'use strict';
/**
 * @ngdoc function
 * @name vexTradedeskApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vexTradedeskApp
 */
angular.module('vexTradedeskApp')
  .controller('MainCtrl', function ($scope, ethereum, $mdBottomSheet, $mdDialog, $timeout, $mdSidenav, socketio, Contracts, updateDirectorate) {
    
    // Create loading window to allow Ethereum node to fully launch.

    $mdDialog.show({
    	parent: angular.element(document.body),
    	template : '<md-dialog>'+
						'<md-dialog-content>'+
							'<md-progress-linear md-mode="indeterminate"></md-progress-linear>'+
							'<div layout="column" layout-align="center center" layout-padding>'+
								'<p class="md-display-1">VΞNTURΞ ΞQUITY ΞXCHANGΞ | DIRΞCTORATΞ</p>'+
								'<p class="md-display-1">Loading, please wait...</p>'+
							'</div>'+
						'</md-dialog-content>'+
					'</md-dialog>'
    });

    $timeout(function(){
    	$mdDialog.hide();
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
