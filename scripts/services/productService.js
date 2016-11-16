macApp.factory('ProductService',['$q','$rootScope','$http', function($q, $rootScope, $http){
	
	var productService= {};
	
	productService.modules	=	[
		{name:'modifyFacilities',url:'app/views/deal/modifyFacilitiesData.html'},
		{name:'updateSecurities'},
		{name:'updateGuarantees'},
		{name:'verifyConditions'},
	];
	
	productService.tabs	=	[
	     {
	    	 id:'ModifyFacilities',
	         name:'Modify Facilities',
	         active:true,
	         display:true,
	         viewTask:'Display ModifyFacilities',
	         editTask:''
	     },
	     { 
	    	 id:'UpdateSecurities',
	         name:'Update Securities',
	         active:false,
	         display:true,
	         viewTask:'Display UpdateSecurities',
	         editTask:''
	     },
	     { 
	    	 id:'UpdateGuarantees',
	         name:'Update Guarantees',
	         active:false,
	         display:true,
	         viewTask:'Display UpdateGuarantees',
	         editTask:''
	     },
	     {
	    	 id:'VerifyConditions',
	    	 name:'Verify Conditions',
	    	 active:false,
	    	 display:true,
	    	 viewTask:'Display VerifyConditions',
	    	 editTask:''
	     },
	  ];
	 
	productService.fetchChargeList = function(chargeDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./fetchChargeList',chargeDTO);
	};

	productService.validateAndRemoveCharge = function(chargeDTO){
				$http.defaults.headers.post['Content-Type'] = 'application/json';
				return	$http.post('./validateAndRemoveCharge',chargeDTO);
	};
	
	productService.removeCharge = function(chargeId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./removeCharge',chargeId);
	};
	productService.saveCharges = function(chargeDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./saveCharge', chargeDTO);
	};
	productService.getReferenceDataCollection = function(refDataIdentifiers){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./getReferenceDataCollection',refDataIdentifiers);
	};
	
	productService.getFacilitiesForDeal = function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getFacilitiesForDeal',dealId);
	};
		
	productService.getProductDetails = function(productId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getProductDetails',productId);
	};
	productService.clearFacilityInDeal = function(product){	
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./clearFacilityInDeal', product);
	};
	
	
	productService.saveModifiedFacility = function(dealProduct){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./saveDealProductDetails', dealProduct);
	};
	
	productService.getCGProductLimitValues = function(productTypeId,sourceGroupNo,userName,isRevolvingLineOfCredit,dealId,productId){
		var params = {
				"productTypeId":productTypeId,
				"SourceGroupNo":sourceGroupNo,
				"userName":userName,
				"isRevolvingLineOfCredit":isRevolvingLineOfCredit,
				"dealId":dealId,
				"productId":productId	
		};
		var paramObj = JSON.stringify(params);
		return  $http.post('./getCustomerGroupProductLimitValues',paramObj);
	};
	
	productService.getProductWithRulesInfo = function(dealProduct){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getProductWithRulesInfo', dealProduct);
	};
	
	productService.getCustomerToCreateNewBorrowingEntity = function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./fetchToCreateNewBorrowingEntity', dealId);
	};
	productService.validateToCreateNewBorrowingEntity = function(borrowingDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./validateToCreateNewBorrowingEntity', borrowingDTO);
	};
	productService.createNewBorrowingEntity = function(borrowingDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./createNewBorrowingEntity', borrowingDTO);
	};
	productService.deleteNewFacility = function(dealProduct){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./deleteNewFacility', dealProduct);
	};
	
	productService.deleteBorrowingEntity = function(accountOwnerId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./deleteBorrowingEntity', accountOwnerId);
	};
	productService.fetchForEditBorrowingEntity = function(accountOwnerId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./fetchForEditBorrowingEntity', accountOwnerId);
	} ;
	productService.editBorrowingEntity = function(borrowingDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./editBorrowingEntity', borrowingDTO);
	};
	productService.getBPCProductsForLolaDeal = function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getBPCProductsForLolaDeal', dealId);
	};
	productService.updateTrustDataFromSubmittedDeal = function(data){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./updateTrustDataFromSubmittedDeal', data);
	};
	
	
	
	return productService;

}])

.factory('custGroupFacilitiesFactory',function(){
	
	var _custGroupFacilitiesFactory = {};
	_custGroupFacilitiesFactory.custGroupId ="";
	_custGroupFacilitiesFactory.dealId ="";
	_custGroupFacilitiesFactory.borrowersList=[];
	_custGroupFacilitiesFactory.product = "";
	_custGroupFacilitiesFactory.productLimit = "";
	_custGroupFacilitiesFactory.informationMsgModifyFacility="";
	_custGroupFacilitiesFactory.isExtendFacility = false;
	return _custGroupFacilitiesFactory;
})

.factory('facilitiesAndSecurityFactory',function(){
	
	var _facilitiesAndSecurityFactory = {};
	_facilitiesAndSecurityFactory.currentFacilityDetails = {};
	_facilitiesAndSecurityFactory.dealFacilitiesDTO ='';	
	return _facilitiesAndSecurityFactory;
});
