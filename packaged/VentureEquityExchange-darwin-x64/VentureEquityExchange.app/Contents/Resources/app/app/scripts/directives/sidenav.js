'use strict';

/**
 * @ngdoc directive
 * @name vexTradedeskApp.directive:sidenav
 * @description
 * # sidenav
 */
angular.module('vexTradedeskApp')
  .directive('sidenav', function ($mdSidenav) {
    return {
		templateUrl: 'views/sidenav.html',
		restrict: 'EA',
		link: function postLink(scope, element, attrs) {

			scope.toggleSidePanel = function() {
				$mdSidenav('left').toggle();
			}
		}
    };
  });
