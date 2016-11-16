macApp.factory('calLimitService',["$q","$rootScope","$http",function($q, $rootScope, $http){
	
	
	var calLimitTypeDisplayMapping= ["","Term Lending","Home Lending","Overdraft","Overdraft","Cancellable","Credit Card","Non Cancellable","Primary & 2nd Assets","Tertiary Assets","Guarantees & Bonds","","Term Lending"];
	var headingToCalLimitMap = [ {
		"display" : "Consumer Lending",
		"values" : [ 2 ]
	}, {
		"display" : "Business Lending",
		"values" : [ 1, 10, 3 ]
	}, {
		"display" : "Equipment Finance",
		"values" : [ 8, 9 ]
	}, {
		"display" : "Business Unsecured Lending",
		"values" : [ 12, 4, 6 ]
	}, {
		"display" : "Insurance Premium Funding",
		"values" : [ 5, 7 ]
	} ];				
	return {
		getHeadingToCalLimitMap : function() {
			return headingToCalLimitMap;
		},
		getCalLimitTypeDisplay : function(calTypeReferenceData) {
			for (var i = 0; i < calTypeReferenceData.length; i++) {
				calTypeReferenceData[i].displayName = calLimitTypeDisplayMapping[calTypeReferenceData[i].key];
			}
			return calTypeReferenceData;
		},
		getcalLimitDetails : function(customerIndication){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./getCALLimitDetails',customerIndication);
		},
		
		postCalLimitDetails : function(payload){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./insertOrUpdateStgCalLimits',payload);
		}
	};	
}]);


