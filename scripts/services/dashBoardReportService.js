macApp.service('dashBoardReportService', ['$http', function($http) {
	var dashBoardReportService= {};
	
	dashBoardReportService.getTopPartcptngBankers = function(userName,topNumber){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getTopPartcptngBankers',userName,topNumber);
	};
	
	dashBoardReportService.getParticipationForAllStates = function(userName){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getParticipationForAllStates',userName);
	};
	
	dashBoardReportService.getSGMReport = function(userName){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getSGMReport',userName);
	};
	
	return dashBoardReportService;
}]);