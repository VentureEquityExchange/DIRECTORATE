'use strict';
/**
 * @ngdoc function
 * @name vexTradedeskApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vexTradedeskApp
 */
angular.module('vexTradedeskApp')
  .controller('MainCtrl', function ($scope, ethereum, $mdBottomSheet, $mdDialog, $timeout, $mdSidenav, socketio, Contracts, updateDirectorate, Venture, $rootScope) {
    
    $scope.view = 'loading';
    $rootScope.setView = function(view){
        $scope.view = view;
    }

    // setTimeout(function(){
    //     Venture.create().then(function(venture){
    //         console.log(venture);
    //     }).catch(function(error){
    //         console.log(error);
    //     });        
    // }, 1000);
    


    // Create loading window to allow Ethereum node to fully launch.

    if($scope.view == 'loading'){
        $mdDialog.show({
            parent: angular.element(document.body),
            templateUrl : 'views/loading.html'
        });

        $timeout(function(){
            $mdDialog.hide();
            $rootScope.setView('select-account');
        }, 1)    
    }

    


    $scope.openSearch = function(){
    	$mdBottomSheet.show({
		    template: '<search-ventures></search-ventures>'
		  });
    }
    

    $scope.showAccount = function(){
    	$mdBottomSheet.show({
		    template: '<account></account>'
		  });	
    };
    
  });
