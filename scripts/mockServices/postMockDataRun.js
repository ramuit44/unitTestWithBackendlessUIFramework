macApp.run(['$httpBackend','fetchMockDataService', function($httpBackend,fetchMockDataService) {
	
	$httpBackend.whenGET(/.*/).passThrough();
	
	$httpBackend.whenPOST(/.*/).passThrough();


	
}]);