'use strict';

/**
 * @ngdoc directive
 * @name vexTradedeskApp.directive:loading
 * @description
 * # loading
 */
angular.module('vexTradedeskApp')
  .directive('loading', function () {
    return {
      templateUrl: 'views/loading.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
