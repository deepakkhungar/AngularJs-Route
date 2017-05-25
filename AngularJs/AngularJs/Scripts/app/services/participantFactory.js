(function () {
    'use strict';

    angular
		.module('AngularLab1')
        .factory('participantFactory', participantFactory);

	participantFactory.$inject = ['$log', '$http', '$filter'];

	function participantFactory($log, $http, $filter) {
		var oParticipantService = {};

		var gParticipants = [];

		oParticipantService.GetTotalParticipants = function () {
			return "You have " + gParticipants.length + " participants.";
		};

		oParticipantService.StoreParticipants = function (oPInfo) {
			var oData = oParticipantService.IsParticipantExists(oPInfo.PID);

			if (oData.length <= 0) {
				gParticipants.push(oPInfo);
			}
			else {
				oData[0].Name = oPInfo.Name;
				oData[0].Gender = oPInfo.Gender;
				oData[0].Age = oPInfo.Age;
			}
			
		};

		oParticipantService.IsParticipantExists = function (pid) {
			return $filter('filter')(gParticipants, { PID: pid });
		};

		oParticipantService.ListParticipants = function (oData) {
			return gParticipants;
		};

		oParticipantService.GetParticipantInfo = function (pid, callbackfunc) {
			$http({ method: "GET", url: "/example/GetParticipantInfo/" + pid }).then(
				function (response) {
					callbackfunc(response.data, response.status);
				}, function (error) {
					$log.error("Error Occured - " + error.status);
					callbackfunc(error.data, error.status);
				}
			);
		};

		return oParticipantService;		
    }
})();