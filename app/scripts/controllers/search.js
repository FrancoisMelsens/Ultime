'use strict';

angular.module('ultimeApp')
.controller('SearchCtrl', function ($scope, $http, $location) {

	$scope.currentPage = 0;
	$scope.pageSize = 12;
	$scope.numberOfPages=function(){
		return Math.ceil($scope.filtered.length/$scope.pageSize);
	};

	$scope.stations = [];

	$http.get('http://public.opendatasoft.com/api/records/1.0/search?dataset=positions_geographiques_des_stations_du_reseau_ratp&rows=0').success( function (data) {
		$scope.nbstation = data.nhits;
		$scope.nbstation=500;
		refresh();
	});

	function refresh(){
		$scope.stations=[];
		var step = 60;
		var query = 'http://public.opendatasoft.com/api/records/1.0/search?dataset=positions_geographiques_des_stations_du_reseau_ratp';
		for (var i = 0; i < $scope.nbstation; i+=step) {
			query ='http://public.opendatasoft.com/api/records/1.0/search?dataset=positions_geographiques_des_stations_du_reseau_ratp&rows='+step+'&start='+i;
			get(query);
		}
	}

	function get(query){
			$http.get(query).success( function (data) {
				data.records.forEach( format, data.records);
				$scope.stations = $scope.stations.concat(data.records);
			});
	}
	
	function format(element,index){
		this[index] = element.fields;
		this[index].recordid = element.recordid;
		this[index].geometry = element.geometry;
	}

	$scope.goTo = function (id) {
		$location.path('/station/' + id);
	};


	}).filter('startFrom', function() {
		return function(input, start) {
			start = +start;
			return input.slice(start);
		};
	});