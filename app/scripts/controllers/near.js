'use strict';

angular.module('ultimeApp')
.controller('NearCtrl', function ($scope, $window, $http, $location) {
	$scope.distance = 1000;

	$scope.dist = [
		{name: '50 m', val: 50},
		{name: '100 m', val: 100},
		{name: '200 m', val: 200},
		{name: '500 m', val: 500},
		{name: '1000 m', val: 1000}
	];

	$scope.map = {
		center: {
			latitude: 0,
			longitude: 0
		},
		zoom: 15,
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
		options: {
			clickable:false,
			cursor:'move',
			icon: {
				url: 'http://steeplemedia.com/images/markers/markerBlue.png'
			}
		}
	};

	$scope.circle = [{
		radius: $scope.distance,
		fill: {
			color: '#800080',
			opacity: 0.05
		},
		stroke: {
			color: '#800080',
			weight: 1,
			opacity: 1
		}
	}];

	//$('#gmap').append("<circle center='{44.78, 2}' radius='10000' clickable='false'></circle>");

	$scope.width = document.getElementById('gmap').offsetWidth;

	$window.navigator.geolocation.getCurrentPosition(function(position) {
		$scope.$apply(function() {
			$scope.position = position;

			$scope.map.center.latitude = position.coords.latitude;
			$scope.map.center.longitude = position.coords.longitude;

			$scope.marker.coords.latitude = position.coords.latitude;
			$scope.marker.coords.longitude = position.coords.longitude;

			$scope.around();
		});
	}, function(error) {
		alert(error);
	});

	$scope.around = function () {
		$scope.circle[0].radius = $scope.distance;
		var query ='http://public.opendatasoft.com/api/records/1.0/search?dataset=positions_geographiques_des_stations_du_reseau_ratp&rows=50&geofilter.distance=' + $scope.marker.coords.latitude + ',' + $scope.marker.coords.longitude + ',' + $scope.distance;
		$http.get(query).success( function (data) {
			$scope.stations = data.records;
			$scope.stations.forEach( format, $scope.stations);
		});
	};

	function format(element,index){
		this[index] = element.fields;
		this[index].recordid = element.recordid;
		this[index].geometry = element.geometry;
	}

	$scope.goTo = function (id) {
		$location.path('/station/' + id);
	};
});