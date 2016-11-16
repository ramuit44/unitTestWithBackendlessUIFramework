macApp.factory('staticDataService',['$http', '$q', function($http, $q){
	
	var staticDataService= {};

	staticDataService.getReferenceDataCollection = function(refDataIdentifiers){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./getReferenceDataCollection', refDataIdentifiers);
	};

	staticDataService.getReferenceData = function(refDataType){
		 $http.defaults.headers.post['Content-Type'] = 'application/json'; 
		return	$http.post('./referenceDropDownData', refDataType);
	},

	staticDataService.loadStateList= function(configParams){
		return  $http.get('./getStateListForCountry', 
							{ params: configParams,
							  cache: true});
	};
	staticDataService.loadSuburbList= function(configParams){
		return  $http.get('./getSuburbListForState', { params: configParams,
							  cache: true});
	};
	staticDataService.loadPostcodeList= function(configParams){
		return  $http.get('./getPostcodeListForSuburb',{ params: configParams,
							  cache: true});
	};
	
	return staticDataService;

}]);
