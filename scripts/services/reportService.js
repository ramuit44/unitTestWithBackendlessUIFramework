macApp.service('reportService', ['$q','$rootScope','$http', function($q, $rootScope, $http) {
	var reportService= {};
	
	reportService.getTopPartcptngBankers = function(userName){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getTopPartcptngBankers',userName);
	};
	
	reportService.getParticipationForAllStates = function(userName){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getParticipationForAllStates',userName);
	};
	
	
	reportService.getYTDReport = function(userName,stateList){
		return	$http.get('./getYTDReport?userName='+userName+'&stateList='+stateList,{ cache: false});
	};
	
	reportService.getLolaDealActivity = function(userName){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getLolaDealActivity',userName);
	};
	
	
	return reportService;
}]);