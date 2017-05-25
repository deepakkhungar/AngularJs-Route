(function () {
    'use strict';

    angular
        .module('AngularLab1')
        .controller('participantController', participantController);

	participantController.$inject = ['$scope', '$filter', '$location', '$routeParams', 'participantFactory'];
	function participantController($scope, $filter, $location, $routeParams, participantFactory) {
        $scope.title = 'participantController';

		$scope.Participants = [];

		$scope.ParticipantInfo = {
			"PID": "",
			"Name": "",
			"Gender": "",
			"Age": "",
			"Color" : ""
		};

		if ($routeParams.msg != undefined)
		{
			alert($routeParams.msg);
		};

		$scope.GetTotalParticpants = function () {
			alert(participantFactory.GetTotalParticipants());
		};

		$scope.RedirectPage = function (url) {
			$location.path(url);
		};

		$scope.$watch("ParticipantInfo", function () {
			for (var iIdx = 0; iIdx <= participantFactory.ListParticipants().length - 1; iIdx++)
			{
				var oData = participantFactory.ListParticipants()[iIdx];

				if (oData.Age > 80) {
					oData.Color = "Red";
				}
				else
				{
					oData.Color = "White";
				}
			}
		});

		$scope.SaveParticipant = function () {
			participantFactory.StoreParticipants($scope.ParticipantInfo);

			$scope.ParticipantInfo = {
				"PID": "",
				"Name": "",
				"Gender": "",
				"Age": "",
				"Color" : ""
			};
		}

		$scope.ReadDataFromGlobalObject = function () {
			return participantFactory.ListParticipants();
		};

		$scope.FetchParticipant = function (pid) {
			var oReturnData = {};

			angular.forEach($scope.Participants, function (data) {

				if (data.PID == pid) {
					$scope.ParticipantInfo = {
						"PID": data.PID,
						"Name": data.Name,
						"Gender": data.Gender,
						"Age": data.Age
					};

					oReturnData = data;
				}
			})

			return oReturnData;
		};

		$scope.FetchParticipantUsingFilterSvc = function (pid) {
			$scope.Participants = participantFactory.ListParticipants();
			var oData = $filter('filter')($scope.Participants, { PID: pid });

			if (oData.length > 0) {
				$scope.$parent.ParticipantInfo = {
					"PID": oData[0].PID,
					"Name": oData[0].Name,
					"Gender": oData[0].Gender,
					"Age": oData[0].Age
				};

			}

			return oData;
		};

		
		$scope.GetParticipantInfoWebAPI = function (pid) {
			return participantFactory.GetParticipantInfo(pid, function (data, status) {
				if (status == 200) {
					// Success
				}
				else
				{
					// Error Handling
				}
			});
		};
    }
})();
