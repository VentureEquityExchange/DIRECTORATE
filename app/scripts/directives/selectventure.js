'use strict';

/**
 * @ngdoc directive
 * @name vexTradedeskApp.directive:selectVenture
 * @description
 * # selectVenture
 */
angular.module('vexTradedeskApp')
  .directive('selectVenture', function () {
    return {
      templateUrl: 'views/selectventure.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        scope.ventures = [];
        scope.loading = true;
      }
    };
  });
