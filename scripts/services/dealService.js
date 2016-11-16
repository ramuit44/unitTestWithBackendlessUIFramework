macApp.factory('custGroupFacilitiesFactory',function(){
	
	var _custGroupFacilitiesFactory = {};
	_custGroupFacilitiesFactory.custGroupId ="";
	_custGroupFacilitiesFactory.dealId ="";
	_custGroupFacilitiesFactory.borrowersList=[];
	_custGroupFacilitiesFactory.borrowerProducts=[];
	_custGroupFacilitiesFactory.selectedBorrower = {};
	return _custGroupFacilitiesFactory;
})

.factory('decisionDetailsFactory',function(){
	var _decision = {};
	_decision.decisionStatus="";
	_decision.decisionSubStatus="";

	return _decision; 
})
.factory('dealFactory',function(){
	var _deal = {};
	_deal.isRollover="";
	_deal.productList=[];
	return _deal; 
})

.factory('dealService',['$q','$rootScope','$http','decisionDetailsFactory','customerGroupService','custGroupDetailFactory','ModalService', 'Constants', '$location','$window','connectionProfileModalService', function($q, $rootScope, $http, decisionDetailsFactory,customerGroupService,custGroupDetailFactory, ModalService, Constants, $location, $window,connectionProfileModalService){
	
	var dealService= {};
	
	
	
	dealService.tabs	=	[
	     {
	    	 id:'ModifyFacilities',
	         name:'FACILITIES',
	         active:true,
	         enable:true,
	         viewTask:'Display ModifyFacilities',
	         editTask:'',
	         url:'app/views/deal/dealModifyFacilities.html'
	     },
	     { 
	    	 id:'UpdateSecurities',
	         name:'SECURITIES',
	         active:false,
	         enable:false,
	         viewTask:'Display UpdateSecurities',
	         editTask:'',
	         url:'app/views/deal/dealUpdateSecurities.html'
	     },
		  {
		     id:'VerifyCustomers',
		     name:'CUSTOMERS',
		     active:false,
		     enable:true,
		     viewTask:'Display Customers',
		     editTask:'',
		     url:'app/views/deal/dealModifyCustomers.html'
		  },
	     { 
	    	 id:'FinancialsAndAcrp',
	         name:'FINANCIALS',
	         active:false,
	         enable:false,
	         viewTask:'Display ModifyFinancialsAndAcrp',
	         editTask:'',
	         url:'app/views/deal/dealModifyFinancialsAndACRP.html'
	      },	      
	     {
	    	 id:'VerifyConditions',
	    	 name:'CONDITIONS',
	    	 active:false,
	    	 enable:true,
	    	 viewTask:'Display VerifyConditions',
	    	 editTask:'',
	    	 url:'app/views/deal/dealVerifyConditions.html'
	     }
	  ];
	
	dealService.getUnassignedAssets = function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getUnassignedAssetInDeal',dealId);
	};
	
	dealService.deleteUnassignedAssetsInDeal = function(data){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./deleteMultipleDMAssetsInDeal',data);
	};
	
	
	dealService.getACRPAndServiceabilityCover = function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getACRPAndServiceability',dealId);
	};
	
	dealService.getDropDownData = function(refDataIdentifiers){
		return	$http.get('./referenceDropDownData1?referenceDataGroups='+refDataIdentifiers,{cache: true});
	},
	
	dealService.saveACRPAndServiceability = function(dealRiskProfile){
		 $http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./saveACRPAndServiceability', dealRiskProfile);
	};
	
	dealService.getDealDecisionDetails = function(dealId){
		 $http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getDealDecisionDetails', dealId);
	};
	
	dealService.makeDecisionOnDeal = function(dealId){
		
		 $http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./makeDecisionOnDeal', dealId);
	};
	
	dealService.getBorrowersForDeal= function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getBorrowersForDeal', dealId);
	};
	
	dealService.getVerifyCondition = function(dealVerifyConditionsDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getVerifyCondition', dealVerifyConditionsDTO);
	};
	dealService.getPageHeader = function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getModifyChargeDetails', dealId);
	};
	
	dealService.getPageHeaderNewFacility = function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getPageHeaderNewFacility', dealId);
	};
	
	dealService.saveCALApprovalDetails = function(decision){
		 $http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./saveDealApprovalConditionDetails', decision);
	};
	dealService.saveVerifyCondition = function(dealVerifyConditionsDTO){
		 $http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./saveDealVerifyCondition', dealVerifyConditionsDTO);
	};
	
	dealService.finaliseDeal = function(dealDto){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./finaliseDeal', dealDto);
	};
	
	dealService.clearDecisionAndDecisionConditions = function(dealDTO){
		 $http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./clearDecisionAndDecisionConditions', dealDTO);
	};
	
	dealService.getDealDecisionReasons = function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getDealDecisionReasons', dealId);
	};
	
	dealService.getBrokerDetails = function(dealDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getBrokerDetails', dealDTO);
	};
	
	dealService.saveBrokerDetails = function(dealDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./saveBrokerDetails', dealDTO);
	};
	
	dealService.removeBrokerFromDeal = function(dealDTO){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./removeBrokerFromDeal', dealDTO);
	};
	
	dealService.getBorrowingPowerSecurities = function(borrowerDealId){
		var borrowerSecurity = {'borrowerDealId':borrowerDealId, 'lolaDealId': $rootScope.dealId};
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./getBPCSecurities', borrowerSecurity);
	};

	dealService.loadDataForTrustSetup = function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getCustomerListForSettingUpTrust',dealId);
	}
	
	dealService.saveNewTrust = function(trust){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./setUpNewTrust',trust);
	}
	dealService.getUserWithYellowBelt = function(userName){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getUserWithYellowBelt',userName);
	}
	
	dealService.getTrustList = function(dmCustomerId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getTrustList',dmCustomerId);
	}
	
	dealService.revertUnusedTrustCustomer = function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./revertUnusedTrustCustomer',dealId);
	}
	
	dealService.performCreditCheck = function(dealId,sourceGrpNo){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		var DealDTO = {'dealId':dealId,'sourceGroupNo':sourceGrpNo,'username':$rootScope.username};
		return $http.post('./performCreditCheckForDeal',DealDTO);
	};
	
	dealService.setDealDecisionAndStatusForFinaliseDeal = function(dealId){
		 $http.defaults.headers.post['Content-Type'] = 'application/json';
		return  $http.post('./setDealDecisionAndStatusForFinaliseDeal', dealId);
	};
	
	dealService.handleFastTrackrollOverDeals = function(dealId, isDealsubmittedToTLA, scope, config){
		scope.showSpinner();
		var promise = customerGroupService.getRolloverFacilityDetailsOfMaturingFacilityFTDeal(dealId);
		promise.then(function(result){
			var rolloverFacilitiesDTO = result.data.resultObject;
			//If retry open MF popup in edit mode
			if(config && config.isRetry)
			{
				connectionProfileModalService.showMaturingFacilitiesFTRollOverDetails(rolloverFacilitiesDTO, scope, false);
			}
			else {
			connectionProfileModalService.showMaturingFacilitiesFTRollOverDetails(rolloverFacilitiesDTO, scope, isDealsubmittedToTLA);
			}
			
			scope.hideSpinner();
		});
	}

	dealService.redirectDeal = function(deal, scope, config){
		config = (config)?config:{};
		if(deal.dealStatus == null && deal.dealStatusId > 0){
			deal.dealStatus = dealService.getDealStatusFromDealStatusId(deal.dealStatusId);
		}
		
		if(deal.fastTrackRollover)
		{
			if(config.isDealsubmittedToTLA == null) {
				config.isDealsubmittedToTLA = dealService.isDealsubmittedToTLA(deal.dealStatus);
			}
			dealService.handleFastTrackrollOverDeals(deal.id, config.isDealsubmittedToTLA, scope);
		}
		else 
		{
			custGroupDetailFactory.searchedDealForCG = deal;
			var promise	=	customerGroupService.custGroupDetails(deal.sourceGroupNo);
			promise.then(function(result){
				custGroupDetailFactory.customerGroup = result.data.resultObject;
				dealService.dealRedirectOuter(deal.id, deal.sourceGroupNo, deal.dealStatus, deal.sourceGroupNoDeleted, scope, deal.dealStatusIdBeforeExpiry, config, false);
				custGroupDetailFactory.searchedDealForCG = deal;
			});
		}
		
	};
		
	dealService.dealRedirectOuter =	function(dealId, sourceGroupNo, dealStatus, sourceGroupNoDeleted, scope, dealStatusBeforeExpiry, config, fastTrackRolloverDeal){
		config = (config)?config:{};
		scope = (scope)?scope:{};
		if(fastTrackRolloverDeal){
			dealService.handleFastTrackrollOverDeals(dealId, fastTrackRolloverDeal, scope, config);
			return;
		}
		$rootScope.dealId = dealId;
		custGroupDetailFactory.custGroupId = sourceGroupNo;
		if(!sourceGroupNoDeleted){
			switch(dealStatus){
				case Constants.dealStatus.EXPIRED:
				{
					// Verify if this flag is populated in launch pad pages
					if(!(dealStatusBeforeExpiry === Constants.dealStatusCode.READY_TO_SUBMIT ||	dealStatusBeforeExpiry === Constants.dealStatusCode.FINALIZE_DEAL)){
						$location.path("/dealPage");
						break;	
					}
				}				
				case Constants.dealStatus.FINALISE:{
					scope.getDecision(dealId).success(function(data, status, headers, config){
						var result = data.resultObject;
						if(result) {
							decisionDetailsFactory.decision = result;
							$rootScope.dealStatus = decisionDetailsFactory.decision.dealStatusCode;
							scope.decision  = decisionDetailsFactory.decision;
						}
						$location.path("/dealfulfillment");	
					});
					break;				
				}				
				default:{
					$location.path("/dealPage");
					break;	
				}
			}
		}else{
			switch(dealStatus){
				case Constants.dealStatus.UNSUCCESS:
				case Constants.dealStatus.SUBMIT:{
					$location.path("/dealPage");
					break;
				}
				default:{
					scope.sourceGroupDeletionHeading	=	"Status of your Deal";
					scope.sourceGroupDeletionWarning="This deal can no longer be progressed as the connection has been deleted from WOS";
					$('#sourceGroupNoDeletedWarning').modal('show');
					break;
				}
			}
		}
	};

	dealService.isDealsubmittedToTLA = function(status){
		return (status === Constants.dealStatus.SUBMIT || status === Constants.dealStatus.UNSUCCESS || status === Constants.dealStatus.EXPIRED);
	};
	
	dealService.redirectDealBasedOnStatus = function(deal, user, scope, config){
		config = (config)?config:{};
		if(config.isDealsubmittedToTLA == null) {
			if(deal.dealStatus == null && deal.dealStatusId > 0){
				deal.dealStatus = dealService.getDealStatusFromDealStatusId(deal.dealStatusId);
			}
			config.isDealsubmittedToTLA = dealService.isDealsubmittedToTLA(deal.dealStatus);
		}
		if(!config.isDealsubmittedToTLA){
			dealService.redirectDeal(deal, scope, config);
		} else {
			if(deal.dealStatus === Constants.dealStatus.SUBMIT){
				var opr = ModalService.showSubmittedDealStatusModal(deal, user).result;

				opr.then( function(userSelection){				
					if(userSelection === 'retry'){
						config.isRetry = true;
						var dealId = deal.dealId | deal.id; 
						dealService.dealRedirectOuter(dealId, deal.sourceGroupNo, Constants.dealStatus.UNSUCCESS, false, scope, null, config, deal.fastTrackRollover);
					}	
				});
			} else if(deal.dealStatus === Constants.dealStatus.UNSUCCESS){
				var opr = ModalService.showUnsuccessDealStatusModal(deal, user).result;
				
				opr.then( function(userSelection){				
					if(userSelection === 'retry'){
						config.isRetry = true;
						var dealId = deal.dealId | deal.id; 
						dealService.dealRedirectOuter(dealId, deal.sourceGroupNo, Constants.dealStatus.UNSUCCESS, false, scope, null,config, deal.fastTrackRollover);
					}	
				});
			}
		}
	};

	dealService.getDealStatusFromDealStatusId = function(dealStatusId){
		switch(dealStatusId){
			case 9:{
				return Constants.dealStatus.FINALISE;
			}
			case 10:{
				return Constants.dealStatus.MODIFY;
			}
			case 12:{
				return Constants.dealStatus.COMPLETE_FIN;
			}
			case 13:{
				return Constants.dealStatus.SUBMIT;
			}
			case 14:{
				return Constants.dealStatus.READY;
			}
			case 15:{
				return Constants.dealStatus.UNSUCCESS;
			}
			case 16:{
				return Constants.dealStatus.EXPIRED;
			}
		}
	}

	dealService.getAllActiveCustomerDetails= function(dealId){
		$http.defaults.headers.post['Content-Type'] = 'application/json'; 
		return  $http.post('./getAllActiveCustomerDetailsForDeal', dealId);
	};

	dealService.getOccupationDetailsForCustomer= function(occupation){
        var occupationDetails={};
        occupationDetails.occupation=occupation;
        $http.defaults.headers.post['Content-Type'] = 'application/json';
        return  $http.post('./getCustomersOccupationDetails',occupationDetails);

	};
	
	dealService.saveAllActiveCustomerDetails = function(activeCustomerDetails){
		 $http.defaults.headers.post['Content-Type'] = 'application/json';
			return  $http.post('./saveAllActiveCustomerDetailsForDeal', activeCustomerDetails);
	};

	dealService.getBaseRateTypeList = function(){
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return $http.post('./getBaseRateTypeList');
	};

	dealService.getCreditCheckResponsePDF = function(dealId){
		$window.open('./generateCreditCheckFile?dealId=' + dealId);
	};

	return dealService;

}]);