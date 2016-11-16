macApp.factory('borrowerPowerCalService',['$q','$rootScope','$http','$window', function($q, $rootScope, $http, $window){
	
	var borrowerPowerCalService= {};
	
    /*for address - start*/
	borrowerPowerCalService.loadStateList= function(countryId){
		$http.defaults.headers.post['Content-Type'] = 'application/json'; 
		return  $http.post('./getStateListForCountry', countryId);
	};
	borrowerPowerCalService.loadSuburbList= function(stateId){
		$http.defaults.headers.post['Content-Type'] = 'application/json'; 
		return  $http.post('./getSuburbListForState', stateId);
	};
	borrowerPowerCalService.loadPostcodeList= function(suburbId){
		$http.defaults.headers.post['Content-Type'] = 'application/json'; 
		return  $http.post('./getPostcodeListForSuburb', suburbId);
	};
	/*for address - end*/
	
	borrowerPowerCalService.getReferenceDataCollection = function(refDataIdentifier){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./getReferenceDataCollection',refDataIdentifier);
	};
	
	borrowerPowerCalService.getBorrowerFinancials = function(refDataIdentifier){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./getBorrowerFinancials',refDataIdentifier);
	};
	borrowerPowerCalService.saveBorrowerFinancials = function(refDataIdentifier){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./saveBorrowerFinancials',refDataIdentifier);
	};
	
	borrowerPowerCalService.createNewBorrowerDeal = function(refDataIdentifier){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./createBorrowerDeal',refDataIdentifier);
	};
	
	borrowerPowerCalService.borrowerDealSearch=function(borrowerDealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./getBorrowerDeal',borrowerDealId);
	};
	
	borrowerPowerCalService.addBorrowerPowerSecurity = function(borrowerSecurityDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./addBorrowerPowerSecurity',borrowerSecurityDTO);
	};
	
	borrowerPowerCalService.getBorrowerSecurities = function(borrowerDealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./getBorrowerSecurities',borrowerDealId);
	};
	
	borrowerPowerCalService.deleteBorrowerPowerSecurity = function(borrowerSecurityId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./deleteBorrowerPowerSecurity',borrowerSecurityId);
	};
	
	borrowerPowerCalService.calculateBorrowerFinancials = function(borrowerDeal){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./calculateBorrowerFinancials',borrowerDeal);
	};
	borrowerPowerCalService.getFacilitiesForProduct = function(borrowerDeal){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./getFacilitiesForProduct',borrowerDeal);
	};
	borrowerPowerCalService.saveNameforBorrowerDeal = function(borrowerDeal){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./saveNameforBorrowerDeal',borrowerDeal);
	};
	
	borrowerPowerCalService.saveBorrowerProduct = function(borrowerDeal){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./saveBorrowerProduct',borrowerDeal);
	};
	
	borrowerPowerCalService.generatePDFFile = function(borrowerDeal){
		$window.open('./generatePDFFile?borrowerDealId='+borrowerDeal.borrowerDealId);
	};
	
	return borrowerPowerCalService;

}]).factory('borrowerDealFactory',function(){
	var _borrowerDealFactory = {};
	_borrowerDealFactory.borrowerDeal = {borrowerPurpose:[],borrowerType:[]};
	
	_borrowerDealFactory.borrowerDeal.borrowerEnteredAmount = null;
	return _borrowerDealFactory;
});
