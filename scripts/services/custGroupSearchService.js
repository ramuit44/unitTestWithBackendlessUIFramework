macApp.factory('customerGroupSearchService',['$q','$rootScope','$http', function($q, $rootScope, $http){
	var customerGroupSearchService= {};
	customerGroupSearchService.searchByCustGroupName = function(custGroupSearchStr){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./searchByCustGroupName', custGroupSearchStr);
	};
	return customerGroupSearchService;
}])

.factory('custGroupSearchDetailFactory',function(){
	
	var _custGroupSearchDetailFactory = {};
	_custGroupSearchDetailFactory.custGroupSearchStr ="";
	_custGroupSearchDetailFactory.customerGroupList=[];
	
	return _custGroupSearchDetailFactory;
});