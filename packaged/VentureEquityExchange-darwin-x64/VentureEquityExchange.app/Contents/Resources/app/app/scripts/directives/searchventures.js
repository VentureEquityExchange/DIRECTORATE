'use strict';

/**
 * @ngdoc directive
 * @name vexTradedeskApp.directive:searchVentures
 * @description
 * # searchVentures
 */
angular.module('vexTradedeskApp')
  .directive('searchVentures', function ($q, $timeout) {
    return {
      templateUrl: 'views/searchventures.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        scope.selectedItems = [];
	        
	    scope.query = {
	    	order : 'name',
	    	limit : 2,
	    	page : 1
	    }

	    // Dummy Data to test table
	    // In production this data will come from smart contract lookup

	    scope.ventures = {
	    	'data' : [
	    	{
	        	'name' : 'ABC',
	        	'sharesAvailable' : {'value': 2312},
	        	'directors' : {'value': 3},
	        	'marketCap' : {'value': 49023}
	        },{
	        	'name' : 'EFG',
	        	'sharesAvailable' : {'value': 4902},
	        	'directors' : {'value': 6},
	        	'marketCap' : {'value': 934902}
	        },{
	        	'name' : 'HIJ',
	        	'sharesAvailable' : {'value': 4829},
	        	'directors' : {'value': 3},
	        	'marketCap' : {'value': 32901}
	        },{
	        	'name' : 'LMN',
	        	'sharesAvailable' : {'value': 3201},
	        	'directors' : {'value': 4},
	        	'marketCap' : {'value': 39011}
	        }]};

		scope.onorderchange = function(order) {
			var deferred = $q.defer();

			$timeout(function () {
			  deferred.resolve();
			}, 2000);

			return deferred.promise;
		};

		scope.onpagechange = function(page, limit) {
			var deferred = $q.defer();

			$timeout(function () {
			  deferred.resolve();
			}, 2000);

			return deferred.promise;
		};
      }
    };
  });
