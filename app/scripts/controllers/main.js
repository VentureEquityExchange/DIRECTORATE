'use strict';
/**
 * @ngdoc function
 * @name vexTradedeskApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vexTradedeskApp
 */
angular.module('vexTradedeskApp')
  .controller('MainCtrl', function ($scope, ethereum, $mdBottomSheet, $mdDialog, $timeout, $mdSidenav, socketio) {
    
    socketio.socket.on('connect', function(){
        socketio.socket.on('connected', function(data){
            alert(data.message);
        });
        socketio.socket.on('contracts', function(contracts){
            console.log(contracts);
        });
        $timeout(function(){
            var NI;
            ethereum.nodeInfo(function(nodeInfo){
                var peer = new Peer(nodeInfo, {host: 'localhost', port: 3000, path: '/peerjs'});
                peer.on('open', function(id){
                    console.log('Connected with id: '+id);
                });

                socketio.socket.emit('directorate_nodeInfo', nodeInfo);
            });
        }, 10000);
    });



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
