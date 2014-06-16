'use strict';

/**
 * @ngdoc overview
 * @name ultimeApp
 * @description
 * # ultimeApp
 *
 * Main module of the application.
 */
angular
  .module('ultimeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'google-maps',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl'
      })
      .when('/station/:id', {
        templateUrl: 'views/station.html',
        controller: 'StationCtrl'
      })
      .when('/findStation', {
        templateUrl: 'views/findStation.html',
        controller: 'MainCtrl'
      })
      .when('/findNear', {
        templateUrl: 'views/findNear.html',
        controller: 'NearCtrl'
      })
      .otherwise({
        templateUrl: 'views/404.html',
        controller: 'MainCtrl'
      });
  });
