'use strict';

angular.module('ultimeApp')
.controller('StationCtrl', function ($scope, $http, $routeParams) {

	$scope.station = [];

	$scope.map = {
		center: {
			latitude: 43.45,
			longitude: 4.43
		},
		coords: {
			latitude: 0,
			longitude: 0
		},
		zoom: 16,
		options: {
			draggableCursor:'move',
			draggingCursor:'auto'
		}
	};

	$scope.marker = {
		coords: {
			latitude: 0,
			longitude: 0
		},
	};

	$http.get('http://public.opendatasoft.com/api/records/1.0/search?dataset=positions_geographiques_des_stations_du_reseau_ratp&q=recordid:'+$routeParams.id).success( function (data) {
		$scope.station = data.records[0];
		$scope.map.center = $scope.station.geometry.coordinates;
		$scope.map.coords = $scope.station.geometry.coordinates;
	});
});