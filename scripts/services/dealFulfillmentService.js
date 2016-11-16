macApp.factory('dealFullfilmentService',['$q','$rootScope','$http', function($q, $rootScope, $http){
	
	var dealFullfilmentService= {};
		
	dealFullfilmentService.tabs	=	[
	     /*{
	    	 id:'customer',
	         name:'CUSTOMER',
	         active:true,
	         display:true,
	         viewTask:'',
	         editTask:'',
	         iscompleted:true,
	         url:'app/views/dealFulfillment/dealFulfillmentCustomerDetails.html'
	     },*/
	     {
	    	 id:'product',
	         name:'PRODUCT',
	         active:false,
	         display:true,
	         viewTask:'',
	         editTask:'',
	         iscompleted:false,
	         url:'app/views/dealFulfillment/dealFulfilmentProductDetails.html'
	     },
	     {
	    	 id:'security',
	         name:'SECURITY',
	         active:false,
	         display:true,
	         viewTask:'',
	         editTask:'',
	         iscompleted:false,
	         url:'app/views/dealFulfillment/dealFulfillmentSecurity.html'
	     },{
	    	 id:'lending_questions',
	         name:'COMPLIANCE QUESTIONS',
	         active:false,
	         display:true,
	         viewTask:'',
	         editTask:'',
	         iscompleted:false,
	         url:'app/views/dealFulfillment/dealFulfilmentLendingQuestions.html'
	     },{
	    	 id:'mcr',
	         name:'THREE PILLARS',
	         active:false,
	         display:true,
	         viewTask:'',
	         editTask:'',
	         iscompleted:false,
	         url:'app/views/dealFulfillment/dealFulfillmentThreePillars.html'
	     }
	     
	  ];
	
	dealFullfilmentService.summaryTabs	=	[
 		{
 			id:'facilities',
 			name:'Deal Details',
 			active:true,
 			display:true,
 			isDisable:false
 		}
 		
 		/*{
 			id:'financials',
 			name:'Financials',
 			active:false,
 			display:true,
 			isDisable:false
 		},
 		{ 
 			id:'acrp',
 			name:'ACRP',
 			active:false,
 			display:true,
 			isDisable:false
 		},
 		{ 
 			id:'conditions',
 			name:'Conditions',
 			active:false,
 			display:true,
 			isDisable:false
 		} */	
 	];
	
	dealFullfilmentService.submitedTLAViewDetail={
			 id:'submitedToTLA',
	         name:'submitedToTLA',
	         url:'app/views/dealFulfillment/dealFulfilmentSubmitedToTLA.html'
	};
	
    /*for address - start*/
	dealFullfilmentService.loadStateList= function(countryId){
		$http.defaults.headers.post['Content-Type'] = 'application/json'; 
		return  $http.post('./getStateListForCountry', countryId);
	};
	dealFullfilmentService.loadSuburbList= function(stateId){
		$http.defaults.headers.post['Content-Type'] = 'application/json'; 
		return  $http.post('./getSuburbListForState', stateId);
	};
	dealFullfilmentService.loadPostcodeList= function(suburbId){
		$http.defaults.headers.post['Content-Type'] = 'application/json'; 
		return  $http.post('./getPostcodeListForSuburb', suburbId);
	};
	/*for address - end*/
	
	dealFullfilmentService.loadCustomerForFulfilment= function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json'; 
		return  $http.post('./getCustomerDetailsForDeal', dealId);
	};

	
	dealFullfilmentService.loadDropDownData  = function(dropDownDataType){
		 $http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getDropDownDataForRiskRanking',dropDownDataType);
	};
	
	dealFullfilmentService.saveCustomerFullfilment = function(customerInformation){
		 $http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./saveCustomerDetailsForDeal',customerInformation);
	};
	
	dealFullfilmentService.getProductDetailsForFullfilment = function(dealId){
		 $http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./getProductDetailsForDealFulFillment',dealId);
	};
	
	
	dealFullfilmentService.getAnzicDetailsForProduct = function(anzsicVal,anzsicCode){
        var anzicDetails={};
        anzicDetails.anzsicName=anzsicVal;
        anzicDetails.anzsicCode=anzsicCode;
        $http.defaults.headers.post['Content-Type'] = 'application/json';
        return  $http.post('./getAnzicDetails',anzicDetails);

       };
      
    dealFullfilmentService.getASCODetails=function(descriptionVal,codeVal){
    	var ascoDetails={};
    	ascoDetails.ascoName=descriptionVal;
    	ascoDetails.ascoCode=codeVal;
        $http.defaults.headers.post['Content-Type'] = 'application/json';
        return  $http.post('./getASCODetails',ascoDetails);
    };

	dealFullfilmentService.saveProductFullfilment = function(productInformation){
		 $http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./saveProductDetailsForDealFulFillment',productInformation);
	};
	
	//US2200
	dealFullfilmentService.getOccupationDetailsForCustomer= function(occupation){
        var occupationDetails={};
        occupationDetails.occupation=occupation;
        $http.defaults.headers.post['Content-Type'] = 'application/json';
        return  $http.post('./getCustomersOccupationDetails',occupationDetails);

	};

	// US2113
	dealFullfilmentService.loadLendingQuestion= function(){
		return  $http.post('./loadLendingQuestion');
	};

	dealFullfilmentService.getBorrowersForDeal= function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getBorrowersForDeal', dealId);
	};

	dealFullfilmentService.saveLendingQuestion= function(data){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./saveLendingQuestion', data);
	};

	// US2270
	dealFullfilmentService.getAllAssetInDeal= function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getAllAssetInDeal', dealId);
	};
	dealFullfilmentService.getReferenceDataCollection = function(refDataIdentifiers){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./getReferenceDataCollection',refDataIdentifiers);
	};
	
	dealFullfilmentService.referenceDropDownData = function(refDataIdentifier){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./referenceDropDownData',refDataIdentifier);
	};
	

	dealFullfilmentService.updateAllAssetInDeal= function(data){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./updateAllAssetInDeal', data);
	};
	//US2114
	dealFullfilmentService.getCustomerDropDownData= function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getCustomersDropDownDetails', dealId);
	};
	
	dealFullfilmentService.getMcrDetails= function(mcrDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getMcrDetails', mcrDTO);
	};
	
	dealFullfilmentService.saveMcrDetails = function(mcrDTO){
		 $http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./saveMcrDetails',mcrDTO);
	};

	//US2241
	dealFullfilmentService.setDealDecisionAndStatus = function(dealId){
		 $http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./setDealDecisionAndStatus', dealId);
	};
	
	dealFullfilmentService.submitToTLA = function(dealId,sourceGroupNo,regionalManagerName){
		var obj = {};
		 obj.dealId = dealId;
		 obj.sourceGroupNo = sourceGroupNo;
		 obj.regionalManagerName = regionalManagerName;
		 $http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./uploadDealToTLA', obj);
	};
	
	dealFullfilmentService.setDealStatusToSubmit=function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./readyToSubmit', dealId);
	};
	
	dealFullfilmentService.updateDealStatusOnPayloadUserAction=function(dealStatusUpdateDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		console.log(dealStatusUpdateDTO);
		return  $http.post('./updateDealStatusOnPayloadUserAction', dealStatusUpdateDTO);
	};
	
	dealFullfilmentService.getNatureForBusinessDetails=function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getNatureForBusinessDetails', dealId);
	};
	
	dealFullfilmentService.checkForTrust=function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./checkDealForTrustConversions', dealId);
	};
	
	dealFullfilmentService.getBaseRateTypeList = function(){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getBaseRateTypeList');
	};
	return dealFullfilmentService;

}]).factory('fulfillmentCustomerDetailFactory',function(){
	
	var _fulfillmentCustomerDetailFactory = {};
		_fulfillmentCustomerDetailFactory.customersList=[];
		_fulfillmentCustomerDetailFactory.productsList = [];
		
	
	return _fulfillmentCustomerDetailFactory;
});
