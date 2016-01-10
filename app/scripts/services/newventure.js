'use strict';

/**
 * @ngdoc service
 * @name vexTradedeskApp.NewVenture
 * @description
 * # NewVenture
 * Factory in the vexTradedeskApp.
 */
angular.module('vexTradedeskApp')
  .factory('NewVenture', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
