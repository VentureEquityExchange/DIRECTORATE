'use strict';

/**
 * @ngdoc overview
 * @name vexTradedeskApp
 * @description
 * # vexTradedeskApp
 *
 * Main module of the application.
 */
angular
  .module('vexTradedeskApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'lumx',
    'md.data.table'
  ])
  .config(function ($routeProvider, $mdThemingProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'account'
      })
      .otherwise({
        redirectTo: '/'
      });

      $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('grey')
        .warnPalette('grey');
  });
