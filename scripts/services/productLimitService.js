macApp.factory('ProductLimitService',function($q, $rootScope, $http){
	return {
		
		getProductLimits : function(custGroupId){
			return  $http.post('./productLimits');
		}
	};	
});


