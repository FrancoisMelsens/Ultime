'use strict';

/**
 * @ngdoc function
 * @name ultimeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ultimeApp
 */
angular.module('ultimeApp')
  .controller('MainCtrl', function ($scope, $http, $location) {

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.map = {
		center: {
			latitude: 48.85,
			longitude: 2.35
		},
		zoom: 10,
		options: {
			draggableCursor:'move',
			draggingCursor:'auto'
		}
	};

	$scope.stations = [];

	$http.get('http://public.opendatasoft.com/api/records/1.0/search?dataset=positions_geographiques_des_stations_du_reseau_ratp&start=0&rows=50').success( function (data) {
		$scope.stations = data.records;
		$scope.stations.forEach( format, $scope.stations);
	});
	
	function format(element,index){
		this[index] = element.fields;
		this[index].recordid = element.recordid;
		this[index].geometry = element.geometry;
	}

	$scope.goTo = function (id) {
		$location.path('/station/' + id);
	};


  });