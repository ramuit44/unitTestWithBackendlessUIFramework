macApp.factory('nextGenBorrowerPowerCalcService',['$q','$rootScope','$http','$window', function($q, $rootScope, $http, $window){
	
	var nextGenBorrowerPowerCalcService= {};
	
   
	nextGenBorrowerPowerCalcService.getReferenceDataCollection = function(refDataIdentifier){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./getReferenceDataCollection',refDataIdentifier);
	};
	
	nextGenBorrowerPowerCalcService.createNewBorrowerDeal = function(borrowerDealDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./createBorrowerDeal',borrowerDealDTO);
	};
    
    nextGenBorrowerPowerCalcService.saveBorrowerFinancials = function(borrowerDealDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./saveBorrowerFinancials',borrowerDealDTO);
	};
    
    nextGenBorrowerPowerCalcService.calculateBorrowerFinancials = function(borrowerDealDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./calculateBorrowerFinancials',borrowerDealDTO);
	};
    
	//Get Limits for CISKeys
	nextGenBorrowerPowerCalcService.getCustomersLimitDetails = function(cisKeys){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./customersLimitDetails', cisKeys);
	};
	
	//Get Customers group details
	nextGenBorrowerPowerCalcService.getCustomersGroupDetails = function(cisKeys){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./customersGroupDetails', cisKeys);
	};
	
     /*for address - start*/
	nextGenBorrowerPowerCalcService.loadStateList= function(countryId){
		$http.defaults.headers.post['Content-Type'] = 'application/json'; 
		return  $http.post('./getStateListForCountry', countryId);
	};
	nextGenBorrowerPowerCalcService.loadSuburbList= function(stateId){
		$http.defaults.headers.post['Content-Type'] = 'application/json'; 
		return  $http.post('./getSuburbListForState', stateId);
	};
	nextGenBorrowerPowerCalcService.loadPostcodeList= function(suburbId){
		$http.defaults.headers.post['Content-Type'] = 'application/json'; 
		return  $http.post('./getPostcodeListForSuburb', suburbId);
	};
	/*for address - end*/
    
    nextGenBorrowerPowerCalcService.addBorrowerPowerSecurities = function(borrowerDealDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./addBorrowerPowerSecurities',borrowerDealDTO);
	};
    
    nextGenBorrowerPowerCalcService.saveBorrowerProduct = function(borrowerDeal){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./saveBorrowerProduct',borrowerDeal);
	};
	
	nextGenBorrowerPowerCalcService.generatePDFFile = function(borrowerDeal){
		$window.open('./generatePDFFile?borrowerDealId='+borrowerDeal.borrowerDealId);
	};
	
	nextGenBorrowerPowerCalcService.saveConnectionNumberForBorrowerDeal = function(borrowerDealDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./saveConnectionNumberForBorrowerDeal',borrowerDealDTO);
	};
	
	nextGenBorrowerPowerCalcService.createDealForBPS = function(borrowerDealDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./createDealFromBPC',borrowerDealDTO);
	};
	
	nextGenBorrowerPowerCalcService.updateBorrowerRateAndTerm = function(borrowerDealDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./updateBorrowerRateAndTerm',borrowerDealDTO);
	};
	
	nextGenBorrowerPowerCalcService.recalculateAffordability = function(borrowerDealDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./recalculateAffordability',borrowerDealDTO);
	};
	
	nextGenBorrowerPowerCalcService.recalculateRepaymentAmount = function(borrowerDealDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./recalculateRepaymentAmount',borrowerDealDTO);
	};
	

	nextGenBorrowerPowerCalcService.getBaseRateTypeList = function(){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getBaseRateTypeList');
	};
	return nextGenBorrowerPowerCalcService;

}]).factory('nextGenBorrowerDealFactory',function(){ 
	var _nextGenBorrowerDealFactory = {};
	_nextGenBorrowerDealFactory.borrowerDealDTO = {
			borrowerDealId:null,
			borrowerDealName:'',
			borrowerEmailAddress:'',
			borrowerContactNumber:'',
			borrowerAmount:null,
			borrowerEnteredAmount:null,
			icr:null,
			dsc:null,
			borrowerAvailableEquity:null,
			borrowingPowerAmount:null,
			borrowerFacilityStatement:'',
			borrowerPurpose:[],
			cisKeyList:[],
			borrowerFinancialCustomersList:[],
			borrowerLiabilitiesTypeDataDTOList:[],
			borrowerProductList:[],
			borrowerDealRate:null,
			borrowerDealFixedRate:null,
			borrowerDealHomeRate:null,
            borrowerDealTerm:null
	};
	
	_nextGenBorrowerDealFactory.operation = 'ADD';
	_nextGenBorrowerDealFactory.conditionalLimitDTO = {};
	_nextGenBorrowerDealFactory.groupDetailsDTO = {};
	
	return _nextGenBorrowerDealFactory;
});