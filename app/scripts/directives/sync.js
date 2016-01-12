'use strict';

/**
 * @ngdoc directive
 * @name vexTradedeskApp.directive:sync
 * @description
 * # sync
 */
angular.module('vexTradedeskApp')
  .directive('sync', function (ethereum) {
    return {
      templateUrl: 'views/sync.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        ethereum.syncing().then(function(status){
          console.log(status);
          scope.status = status;
      	}).catch(function(error){
      		console.log(error);
      	})
      }
    };
  });
