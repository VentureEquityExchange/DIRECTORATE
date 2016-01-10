'use strict';

/**
 * @ngdoc directive
 * @name vexTradedeskApp.directive:selectVenture
 * @description
 * # selectVenture
 */
angular.module('vexTradedeskApp')
  .directive('selectVenture', function (DirectorIndex, $rootScope) {
    return {
      templateUrl: 'views/selectventure.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        scope.loading = true;
        scope.ventures = [];
        
        DirectorIndex.GetVentures($rootScope.account).then(function(ventures){
        	scope.ventures = ventures;
        	scope.loading = false;
        }).catch(function(error){
        	console.log(error);
        });

      }
    };
  });
