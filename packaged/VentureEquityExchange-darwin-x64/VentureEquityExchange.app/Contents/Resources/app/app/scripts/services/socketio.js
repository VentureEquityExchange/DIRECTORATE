'use strict';

/**
 * @ngdoc service
 * @name vexTradedeskApp.socketio
 * @description
 * # socketio
 * Factory in the vexTradedeskApp.
 */
angular.module('vexTradedeskApp')
  .factory('socketio', function (ethereum, $timeout) {
    var io = require('socket.io-client');
    var socket = io('http://localhost:5445'); // eventually this will be load balanced node (vex-hub);
    
    socket.on('connect', function(){
        
        socket.on('connected', function(data){
            alert(data.message);
        });
        
        $timeout(function(){
           ethereum.nodeInfo(function(nodeInfo){
                
                // PeerJS connections for video conferencing... etc
                // var peer = new Peer(nodeInfo, {host: 'localhost', port: 3000, path: '/peerjs'});
                // peer.on('open', function(id){
                //     console.log('Connected with id: '+id);
                // });

                socket.emit('directorate_nodeInfo', nodeInfo);
            });
        }, 10000);
    });

    // Public API here
    return {
      socket : socket
    };
  });
