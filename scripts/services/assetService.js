macApp.factory('AssetService',['$http','$cacheFactory',function($http,$cacheFactory){
	
	var assetServiceCache = $cacheFactory('assetServiceCache');
	
	return {
		
		SQIMapping : [{Value:"EW",Tooltip:"coming soon EW"},
	                     {Value:"EX",Tooltip:"coming soon EX"},
	                     {Value:"FS",Tooltip:"Fully Secured"},
	                     {Value:"LC",Tooltip:"coming soon LC"},
	                     {Value:"LS",Tooltip:"coming soon LS"},
	                     {Value:"PS",Tooltip:"Partially Secured"},
	                     {Value:"SD",Tooltip:"coming soon"},
	                     {Value:"SR",Tooltip:"coming soon SR"},
	                     {Value:"SU",Tooltip:"coming soon SU"},
	                     {Value:"UN",Tooltip:"Unsecured"},
	                     {Value:"VW",Tooltip:"coming soon VW"},
	                     {Value:"WS",Tooltip:"coming soon WS"},
	                     {Value:"XX",Tooltip:"coming soon XX"},
	                     ],
	    //Holder for communication across controllers. Dont use broadcast/emit. Use service holders instead.             
	    assetOperation : {operationName:"",assetId:"", bpcSecurity:{}},
	    
		getAssets : function(productId){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./getAssetsForProduct', 'productId='+ productId);
		},
		getSecurities : function(product){ //Add Secuirities popup
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./getAssetsForDeal',product);
		},
		allocateSecurities : function(facilityWithSecurityDTO){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./allocateSecurityToFacility',facilityWithSecurityDTO);
		},
		getDealSecurityDetails : function(dealId){
			$http.defaults.headers.post['Content-Type'] = 'application/json'; 
			return  $http.post('./getAllocationDetailsForDealId', dealId);
		},
		updateValuation : function(assetDTO){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./updateAssetValuation',assetDTO);
		},
		deallocateAsset : function(assetDTO){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./removeAssetAllocation',assetDTO);
		},
		revertModifiedValuation : function(assetDTO){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./revertModifiedValuation',assetDTO);
		},
		deallocateSupportedGuarantee : function(assetDTO){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./removeSupportedGuaranteeAllocation',assetDTO);
		},
		editGuarantee : function(dealId,guaranteeId,productId,connectionId){
	        var productDealEntity={};
	        productDealEntity.dealId=dealId;
	        productDealEntity.guaranteeId=guaranteeId;
	        productDealEntity.productId=productId;
	        productDealEntity.sourceGroupNo=connectionId;
	        $http.defaults.headers.post['Content-Type'] = 'application/json';
	        return  $http.post('./getAllocatedGuaranteeForProduct',productDealEntity);
		},
		
		
		getReferenceDataCollection :function(refDataIdentifiers){
			return	$http.get('./getReferenceDataCollection1?referenceDataGroups='+refDataIdentifiers,{cache: true});
		},
		
		updateGuaranteeDetails : function(productDTO){
			$http.defaults.headers.post['Content-Type'] = 'application/json'; 
			return  $http.post('./updateGuaranteeInDeal', productDTO);
		},
		addNewGuarantee : function(productDTO){
			$http.defaults.headers.post['Content-Type'] = 'application/json'; 
			return  $http.post('./addNewUnsupportedGuarantee', productDTO);
		},
		getAllGuarantorsForConnection : function(sourceGroupNo){
			$http.defaults.headers.post['Content-Type'] = 'application/json'; 
			return  $http.post('./getAllGuarantorsForConnection', sourceGroupNo);
		},
		saveAssetAllocationDetails : function(dealFacilitiesDTO){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./saveAssetAllocationDetailsInDeal',dealFacilitiesDTO);
		},
		getChargeForSupportedGuarantee : function(dmAssetId){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./getChargeForSupportedGuarantee',dmAssetId);
		},
		saveSupportedGuarantee : function(productDTO){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./saveSupportedGuarantee',productDTO);
		},
		deleteGuarantee : function(productDTO){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./deleteGuarantee',productDTO);
		},
		getSupportedGuaranteeForABorrowingEntity : function(productDTO){
			$http.defaults.headers.post['Content-Type'] = 'application/json'; 
			return  $http.post('./getSupportedGuaranteeForABorrowingEntity', productDTO);
		},
		saveNewSecurity : function(assetproductDTO){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./saveNewSecurity', assetproductDTO);
		},
		allocateSupportedGuarantee : function(productDTO){
			$http.defaults.headers.post['Content-Type'] = 'application/json'; 
			return  $http.post('./allocateSupportedGuarantee', productDTO);
		},
		deleteExternalCharge : function(externalCharge){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./deleteExternalCharge', externalCharge);
		},loadStateList: function(countryId){
			$http.defaults.headers.post['Content-Type'] = 'application/json'; 
			return  $http.post('./getStateListForCountry', countryId);
		},loadSuburbList: function(stateId){
			$http.defaults.headers.post['Content-Type'] = 'application/json'; 
			return  $http.post('./getSuburbListForState', stateId);
		},loadPostcodeList:function(suburbId){
			$http.defaults.headers.post['Content-Type'] = 'application/json'; 
			return  $http.post('./getPostcodeListForSuburb', suburbId);
		},deleteDMAssetsInDeal:function(assetDTO){
			$http.defaults.headers.post['Content-Type'] = 'application/json'; 
			return  $http.post('./deleteDMAssetsInDeal', assetDTO);
		},getCustomersInDeal : function(dealId){
			$http.defaults.headers.post['Content-Type'] = 'application/json'; 
			return  $http.post('./fetchCustomersForSecurity', dealId);
		},
		updateLVR : function(asset){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./updateLVR', asset);
		},
		updateSecuritylandSizeAndArea : function(assetDTO){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./updateExistingSecurityDetails', assetDTO);
		}
	};
	
	
}]);
