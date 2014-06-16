'use strict';

angular.module('ultimeApp')
	.directive('stationDisplay', function (){
		return {
			restrict: 'AEC',
			templateUrl:'views/directive/station.html'
		};
	})
	.directive('stationsDisplay', function (){
		return {
			restrict: 'AEC',
			templateUrl:'views/directive/stations.html'
		};
	})
	.directive('stationsPaginationDisplay', function (){
		return {
			restrict: 'AEC',
			templateUrl:'views/directive/stationsPagination.html'
		};
	});