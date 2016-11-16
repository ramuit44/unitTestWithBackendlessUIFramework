macApp.run(['$httpBackend','fetchMockDataService', function($httpBackend,fetchMockDataService) {
	
	var config = 

    	{

	    	"service" : 'connectionProfileService',

	    	"methodMockConfigs" : 
		    	[
					{
						"url":/dealsForCustomerGroup1\?customerGrpId\=.*\&dealStatusSearchStr\=9,10,12,14/,
					  	"mockUrl": 'connectionProfile/getActiveLendingDeals.json',
					  	"method" : 'GET',
					  	"serviceMethodName" : 'getActiveLendingDeals'
					 },
					 {
						"url":/dealsForCustomerGroup1\?customerGrpId\=.*\&dealStatusSearchStr\=13,15/,
					  	"mockUrl": 'connectionProfile/getSubmittedLendingDeals.json',
					  	"method" : 'GET',
					  	"serviceMethodName" : 'getSubmittedLendingDeals'
					 },
					 {
						"url":/getMaturingFacilities\?customerGrpId\=.*/,
					  	"mockUrl": 'connectionProfile/getMaturingFacilities.json',
					  	"method" : 'GET',
					  	"serviceMethodName" : 'getMaturingFacilities'
					 }
				 ]
		};	 
	
	 fetchMockDataService.executeMocking($httpBackend,config);

	/* $httpBackend.whenGET(/dealsForCustomerGroup1\?customerGrpId\=.*\&dealStatusSearchStr\=9,10,12,14/).respond(function(method, url, data) {
		
		return fetchMockDataService.getData('app/scripts/mockServices/connectionProfile/getActiveLendingDeals.json');
    });

	 $httpBackend.whenGET(/dealsForCustomerGroup1\?customerGrpId\=.*\&dealStatusSearchStr\=13,15/).respond(function(method, url, data) {
		
		return fetchMockDataService.getData('app/scripts/mockServices/connectionProfile/getSubmittedLendingDeals.json');
    }); */

	 
	
	
}]);