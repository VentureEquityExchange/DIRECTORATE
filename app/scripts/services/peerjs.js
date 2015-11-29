'use strict';

/**
 * @ngdoc service
 * @name vexTradedeskApp.peerjs
 * @description
 * # peerjs
 * Factory in the vexTradedeskApp.
 */
angular.module('vexTradedeskApp')
  .factory('peerjs', function (ethereum, $timeout) {
    var Peer = require('peer');
    
    // Public API here
    return {
      peer : Peer
    };
  });
