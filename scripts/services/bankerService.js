macApp.service('bankerService', ['$q','$rootScope','$http', function($q, $rootScope, $http) {
	var bankerService= {};
	bankerService.getHomePageTabs	=	[
		{
			id:'Connections',
			name:'Your Connections',
			active:true,
			viewTask:'viewPortFolio',
			editTask:'viewPortFolio',
			url:'app/views/home/connections.html',
			count:0
		},
		{
			id:'DealsInProgress',
			name:'Deals In Progress',
			active:false,
			viewTask:'viewDealsInProgress',
			editTask:'viewDealsInProgress',
			url:'app/views/home/dealsInprogress.html',
			count:0
		},
		{
			id:'DashBoardReports',
			name:'Home',
			active:false,
			viewTask:'viewReports',
			editTask:'viewReports',
			url:'app/views/home/dashboardReports.html',
			count:0
		}
	];
	
	bankerService.getConnections =  function($http,bankerObject){
		var deffered = $q.defer();
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		$http.post('./connections',bankerObject).success(function(data){
			deffered.resolve({
				data:data
			});
		});
		return deffered.promise;
	};
	
	bankerService.loadMoreConnections	=	function($http,bankerObject){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./connections', bankerObject);
	};
	
	bankerService.getFacilitiesForCustomerGroup	=	function($http,sourceGroupNo){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getfacility', sourceGroupNo);
	};
	bankerService.getUserSearchResultsForDashBoard = function($http,searchInput){
		 $http.defaults.headers.post['Content-Type'] = 'application/json'; 
		return $http.post('./searchUser',searchInput);
	};
	bankerService.getDealsInProgressCount	=	function($http,userName){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./dealsInProgressCount',userName);
	};
	
	bankerService.getDealsInProgress	=	function($http,userName){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./dealsInProgress',userName);
	};
	
	bankerService.getProductLimits = function($http){
		return $http.post('./productLimits');
	}; 
	
	bankerService.getlolaChangeDetails = function($http){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./lolaChangeDetails');
	};
	
	bankerService.getConnectionDetailsReport = function(userName){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getConnectionDetailsReport',userName);
	};
	bankerService.getConnectionAlreadyExportedToday = function(userName){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getConnectionAlreadyExportedToday',userName);
	};
	bankerService.updateConnectionExportFlagForBanker = function(userName){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./updateConnectionExportFlagForBanker',userName);
	};
	bankerService.getReportForSGM = function(userName){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getReportForSGM',userName);
	};
	return bankerService;
}]);


macApp.factory('bankerFactory', function () {
	var _bankerFactory = {};
	_bankerFactory.connections={};
	_bankerFactory.connCount={};
	_bankerFactory.dealsInProgress={};
	_bankerFactory.dealsInProgressCount=0;
	_bankerFactory.isBankerconnLoaded	=	false;
	_bankerFactory.isOtherBankerconnLoaded	=	false;
	_bankerFactory.loginBankerConn={};
	_bankerFactory.loginBankerConnCount={};
	return _bankerFactory;
});
