/* Defining Module */
var macApp	=	angular.module('macApp',['csrf-token-interceptor','ngRoute','ngTable','duScroll','angucomplete-alt','googlechart',"ngSanitize", 'ngCsv',
          	 	                        'ui.bootstrap','textAngular', 'ngAnimate']);
macApp.config(['$httpProvider', function ($httpProvider) {  	
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
}]);


macApp.value('CONST',{
	ReductionBasis:{
		IOF:2,
		IOA:4,
		PIAF:3,
		PIAA:7,
		PO:1
	},
	ReyapmentTypes:{
		WEEKLY:5,
		FORTNIGHTLY:13,
		MONTHLY:4,
		QUARTERLY:3,
		HALFYEARLY:15,
		YEARLY:6
	},
	FrequencyValues:{
		WEEKLY:52,
		FORTNIGHTLY:26,
		MONTHLY:12,
		QUARTERLY:4,
		HALFYEARLY:2,
		YEARLY:1
	}
});
