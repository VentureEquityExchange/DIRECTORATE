'use strict';

/**
 * @ngdoc directive
 * @name vexTradedeskApp.directive:loadAccount
 * @description
 * # loadAccount
 */
angular.module('vexTradedeskApp')
  .directive('loadAccount', function () {
    return {
      templateUrl: 'views/loadaccount.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
