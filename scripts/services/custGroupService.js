macApp.factory('customerGroupService',['$q','$rootScope','$http', 'staticDataService', function($q, $rootScope, $http, staticDataService){
	var customerGroupService= {};
	
	customerGroupService.modules	=	[
		{name:'summary',url:'app/views/customerGroup/custGroupSummary.html'},
		{name:'facilities',url:'app/views/customerGroup/custGroupFacilities.html'},
		{name:'securities',url:'app/views/customerGroup/custGroupSecurity.html'},
		{name:'customers',url:'app/views/customerGroup/custGroupCustomers.html'},
		{name:'history',url:'app/views/customerGroup/custGroupHistory.html'}
	];
	
	customerGroupService.tabs	=	[
		{
			id:'Summary',
			name:'Summary',
			active:true,
			display:true,
			viewTask:'viewSummary',
			editTask:'viewSummary',
			isDisable:false	
		},
		
		{
			id:'Facilities',
			name:'Facilities',
			active:false,
			display:true,
			viewTask:'viewFacilities',
			editTask:'viewFacilities',
			count:0,
			isDisable:true
		},
		{ 
			id:'Securities',
			name:'Securities',
			active:false,
			display:true,
			viewTask:'viewSecurities',
			editTask:'viewSecurities',
			count:0,
			isDisable:true
		},
		{ 
			id:'Customers',
			name:'Customers',
			active:false,
			display:true,
			viewTask:'viewCustomers',
			editTask:'viewCustomers',
			count:0,
			isDisable:true
		},{ 
			id:'History',
			name:'History',
			active:false,
			display:true,
			viewTask:'viewHistory',
			editTask:'viewHistory',
			count:0,
			isDisable:false
		}
		
	];
	
	customerGroupService.custGroupDetails = function(custGrpNo){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./customerGrpDetails', custGrpNo);
	};
	
	customerGroupService.customersForCustGroup = function(custGroupId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./customersForGrp', custGroupId);
	};
	
	customerGroupService.customerGroupLimits =  function(custGroupId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./customerGroupLimits',custGroupId);
	};
	customerGroupService.getToBeCreatedCustGroup = function(){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./tobeCreatedCustomerGrpDetails');
	};
	customerGroupService.dealCheckConnectionInfo =  function(custGroupId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./customerGrpDetails',custGroupId);
	};
	customerGroupService.dealsForCustomerGroup =  function(custGroupId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./dealsForCustomerGroup',custGroupId);
	};
	
	customerGroupService.dealsForCustomerGroup1 = function(configParams){
		return  $http.get('./dealsForCustomerGroup1',{
			params: configParams
		});
	};
	
	customerGroupService.getEquityForCustomerGroup =  function(custGroupId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getEquity',custGroupId);
	};
	customerGroupService.getCurrentLimitForCustomerGroup =  function(custGroupId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getCurrentLimitForCustomerGroup',custGroupId);
	};
	customerGroupService.TLAabortMsgs =  function(custGroupId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./buildDealForCustomerGroup',custGroupId);
	};

	customerGroupService.checkConnectionHealth =  function(custGroupId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./runConnectionHealthCheck',custGroupId);
	};

	customerGroupService.buildDealForCustomerGroup =  function(custGroupId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./createDealForCustomerGroup',custGroupId);
	};
	
	customerGroupService.saveAndRunDecision = function(rolloverFacilitiesDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./saveAndRunDecision', rolloverFacilitiesDTO);
	};
	
	
	customerGroupService.dealsForConnection =  function(statusCodes){
		//$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.get('./lendingDeals?statusCodes='+statusCodes,{cache:false});
	};
	
	customerGroupService.getFacilitiesSecuritiesForCG =  function(sourceGroupNo){
		var deffered = $q.defer();
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		$http.post('./getFacilitiesSecuritiesForCG',sourceGroupNo).success(function(data){
			deffered.resolve({
				data:data
			});
		});
		return deffered.promise;
	};
	
	customerGroupService.deleteDeal =  function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./deleteDeal',dealId);
	};
	
	customerGroupService.fetchTLAData =  function(sourceGroupNo){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./fetchTLAData',sourceGroupNo);
	};
	
	customerGroupService.fetchTLADealStatus =  function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./fetchTLADealStatus',dealId);
	};
	
	customerGroupService.fetchTLADealStatus =  function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./fetchTLADealStatus',dealId);
	};
	
	//Get Limits for CISKeys
	customerGroupService.getCustomersLimitDetails = function(cisKeys){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./customersLimitDetails', cisKeys);
	};
	customerGroupService.fetchDetailsForUnSuccessfulDeal = function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./fetchDetailsForUnsuccessfulDeal', dealId);
	};
	
	customerGroupService.updateDealStatusOnRetry = function(dealDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./updateDealStatusOnRetry', dealDTO);
	};

	/**Service for fetching the Active deals count and the Maturing facilities count in Connection profile Page .. Using GET so that can cache the results **/	
	customerGroupService.getConnectionProfileMetrics = function(custGroupId){
		return  $http.get('./getConnectionProfileMetrics?customerGrpId='+custGroupId);
	};

	customerGroupService.getConnectionMaturingFaciltiesCount = function(custGroupId){
		return  $http.get('./getMaturingFaciltiesCount?customerGrpId='+custGroupId);
	};
	customerGroupService.sendEmailToESRCleanseTeam = function(mailDetails){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./sendEmailToESRCleanseTeam', mailDetails);
	};
	customerGroupService.getMaturingFacilities = function(custGroupId){
		return  $http.get('./getMaturingFacilities?customerGrpId='+custGroupId);
	};
	
	customerGroupService.rollOverFTEligibilityCheck = function(product){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./rollOverFTEligibilityCheck', product);
	};
	
	customerGroupService.rollOverApprovalChecklistEligibilityCheck = function(rolloverFacilitiesDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./rollOverApprovalChecklistEligibilityCheck', rolloverFacilitiesDTO);
	};

	customerGroupService.getAllBeltLevels = function(){
		return staticDataService.getReferenceData("beltLevelList");
	};
	
	customerGroupService.convertToNormalDeal=function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./converFastTrackToNormalRollover', dealId);
	}; 
	
	customerGroupService.getRolloverFacilityDetailsOfMaturingFacilityFTDeal = function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getRolloverFacilityDetailsOfMaturingFacilityFTDeal', dealId);
	}
	
	return customerGroupService;
	
}])

.factory('custGroupDetailFactory',function(){
	
	var _custGroupDetailFactory = {};
	_custGroupDetailFactory.custGroupId ="";
	_custGroupDetailFactory.customerGroup={};
	_custGroupDetailFactory.customersList=[];
	_custGroupDetailFactory.dealsList=[];
	_custGroupDetailFactory.FacilitiesSecuritiesForCG	=	{};
	_custGroupDetailFactory.dealsForCG	=	{};
	_custGroupDetailFactory.searchedDealForCG	=	{};	
	_custGroupDetailFactory.bpcBorrowingEntityFlag = false;
	_custGroupDetailFactory.bpcDealAvailability = false;
	return _custGroupDetailFactory;
})

.factory('connectionProfileFactory', function(){

	var _connectionProfileFactory = {};
	_connectionProfileFactory.sourceGroupNo = "";
	_connectionProfileFactory.connection = {};
	_connectionProfileFactory.financials = {};
	_connectionProfileFactory.FacilitiesSecuritiesForCG = {};
	_connectionProfileFactory.lendingDeals = {};
	_connectionProfileFactory.maturingFacilties = {};
	_connectionProfileFactory.customersList = [];
	_connectionProfileFactory.isDealsLoaded = false;
	_connectionProfileFactory.isMaturingFacilitiesLoaded = false;
	_connectionProfileFactory.isFacilitiesSecuritiesLoaded = false;
	return _connectionProfileFactory;
});