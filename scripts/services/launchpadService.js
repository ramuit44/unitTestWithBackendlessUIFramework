macApp.service('launchpadService', ['$http', function($http) {
	var launchpadService= {};
	
	
	
	launchpadService.getBankerLaunchpadDetails = function(configParams) {
		return	$http.get('./getBankerLaunchpadDetails',{
			params: configParams
		});
	};
	
	launchpadService.getBankerDeals = function(configParams) {
		return $http.get('./bankerDeals',{
			params: configParams
		});

	};
	
	launchpadService.updateUserPreferences	=	function(launchpadUserPreferenceObject){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./updateUserPreferences', launchpadUserPreferenceObject);
	};
	
	launchpadService.getUserPreferences = function() {
		return	$http.get('./getLaunchpadUserPreferences');
	};

	launchpadService.getConnections = function(searchObject) {
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getConnections', searchObject);

	};
	
	launchpadService.getConnections1 = function(searchObject) {
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getConnections1', searchObject);

	};

	launchpadService.getDeals = function(searchObject) {
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getDealsInProgress', searchObject);

	};
	
	
	launchpadService.getBPCDeals = function(searchObject) {
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getBorrowingPowerDeals', searchObject);

	};
	
	launchpadService.getCompleteBorrowerDeal = function(configParams) {
		return	$http.get('./getCompleteBorrowerDeal',{
			params: configParams
		});
	};
	
	return launchpadService;
}]);