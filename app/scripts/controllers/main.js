'use strict';
/**
 * @ngdoc function
 * @name vexTradedeskApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vexTradedeskApp
 */
angular.module('vexTradedeskApp')
  .controller('MainCtrl', function ($scope, ethereum, $mdBottomSheet, $mdDialog, $timeout, $mdSidenav, socketio, Contract, updateDirectorate, Venture, $rootScope) {
    var Promise = require('bluebird');

    $scope.view = 'loading';
    $rootScope.setView = function(view){
        $scope.view = view;
    }

    // Contract.compile('Venture').then(function(compiled){
    //     console.log(compiled);
    // }).catch(function(error){
    //     console.log(error);
    // })

    $rootScope.passwordPrompt = function(){
        return new Promise(function(resolve, reject){
            $mdDialog.show({
              controller: function($scope){
                $scope.password = '';
                $scope.enterPassword = function(password){
                    $mdDialog.hide(password);
                }
              },
              templateUrl: 'views/enterpassword.html',
              parent: angular.element(document.body),
              clickOutsideToClose:true
            }).then(function(password){
                return ethereum.unlockAccount($rootScope.account, password);
            }).then(function(unlocked){
                if(!unlocked){reject(unlocked);}
                resolve(unlocked);
            }).catch(function(error){
                reject(error);
            });
        });
    }

    
    // Create loading window to allow Ethereum node to fully launch.

    if($scope.view == 'loading'){
        $mdDialog.show({
            controller : function($timeout) {
                $timeout(function(){
                    $mdDialog.hide();
                }, 5000)
            },
            parent: angular.element(document.body),
            templateUrl : 'views/loading.html'
        }).then(function(){
            $rootScope.setView('select-account');
            Promise.delay(12000).then(function(){
                return ethereum.syncing();
            }).then(function(status){
                console.log(status);
            }).catch(function(error){
                console.log(error);
            });
        });
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
