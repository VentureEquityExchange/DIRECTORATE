'use strict';

/**
 * @ngdoc service
 * @name vexTradedeskApp.socketio
 * @description
 * # socketio
 * Factory in the vexTradedeskApp.
 */
angular.module('vexTradedeskApp')
  .factory('socketio', function () {
    var io = require('socket.io-client');
    var socket = io('http://localhost:5445'); // eventually this will be load balanced node (vex-hub);
    // Public API here
    return {
      socket : socket
    };
  });
