(function () {
    'use strict';

	var app;

	app = angular.module('AngularLab1', ['ngRoute']);

	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when("/ListParticipants/:msg", {
				templateUrl: "ListData.html",
				controller: "participantController"
			})
			
	}]);
})();