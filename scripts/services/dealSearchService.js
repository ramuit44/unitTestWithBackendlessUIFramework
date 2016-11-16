macApp.factory('dealSearchService',['$q','$rootScope','$http', function($q, $rootScope, $http){
	var dealSearchService= {};
	dealSearchService.searchDealsByDealId = function(dealSearchStr){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./searchDealsByDealId', dealSearchStr);
	};
	return dealSearchService;
}])

.factory('dealSearchDetailFactory',function(){
	
	var _dealSearchDetailFactory = {};
	_dealSearchDetailFactory.dealSearchStr ="";
	_dealSearchDetailFactory.dealList=[];
	
	return _dealSearchDetailFactory;
});