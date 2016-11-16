angular.module('macApp').controller('connectionProfile.connectionProfileMainCtrl',[ '$scope','Constants','connectionProfileFactory', 'customerGroupService', '$rootScope', 'ModalService', '$filter', 'custGroupDetailFactory', '$location', '$q', '$routeParams',
	function($scope, Constants, connectionProfileFactory, customerGroupService, $rootScope, ModalService, $filter, custGroupDetailFactory, $location, $q, $routeParams) {
	
	var TABS = {CONNECTION_PROFILE : 0};
	
	//new header goes here
	$scope.layoutManager.header = 'app/views/connectionProfile/connectionProfileHeader.html';
	$scope.layoutManager.footer = 'app/views/connectionProfile/connectionProfileFooter.html';
	
	//exisiting logic in customerGroupCtrl
	$rootScope.isTLADataLoaded	=	false;
	$rootScope.isTLADataLoading	=	false;

	$scope.lendingDealsCount = 0;
	$scope.maturingFacilitiesCount = 0;

	
	/* function to reset connection profile */
	function resetConnectionProfile(){
		connectionProfileFactory.connection = {};
		connectionProfileFactory.financials = {};
		connectionProfileFactory.financials.limits = {};
		connectionProfileFactory.facilities = {};
		connectionProfileFactory.lendingDeals = {};
		connectionProfileFactory.maturingFacilties = {};
		connectionProfileFactory.customersList = [];
		connectionProfileFactory.isDealsLoaded = false;
		connectionProfileFactory.isFacilitiesSecuritiesLoaded = false;
		connectionProfileFactory.isMaturingFacilitiesLoaded = false;
	}

	resetConnectionProfile();
	
	$scope.childControllerHandler = {};
	
	//initialization code goes here
	$scope.init = function(){
		//constants - check on the approach
		$scope.connProfileTabIndex = Constants.connProfileTabIndex;
		$scope.selectedTabIndex = $scope.connProfileTabIndex.FIN_INDX;
		$scope.connProfilePages = Constants.connProfilePages;
		$scope.connProfileTabs = Constants.connProfileTabs;
		
		connectionProfileFactory.sourceGroupNo = $routeParams.sourceGroupNo;
		custGroupDetailFactory.custGroupId = $routeParams.sourceGroupNo;
		$scope.connectionProfileFactory = connectionProfileFactory;
		
		//get calls for getting the name. source group no
		var connectionDetails = getCustomerGroupDetail();

		//get call for getting the deals count
		var count = getActiveAndMaturingCount();

		$q.all([connectionDetails, count]).then(function(arr){
			connectionProfileFactory.connection = arr[0].data.resultObject;
			$scope.connectionProfileFactory = connectionProfileFactory;
			$scope.lendingDealsCount = arr[1].data.resultObject.activeDealsCount;
			$scope.getGroupOwnerDetails();
		},
		function(err){
			$scope.showError(err);
		});
		
		
	};
	
	// get Relationship Manager name
	$scope.getGroupOwnerDetails = function(){
		$scope.groupOwner = $scope.connectionProfileFactory.connection.groupOwner;
		$scope.custGroupOwnerName ="Not Managed";
		
		if($scope.groupOwner.firstName)
		{
			$scope.firstName = $scope.groupOwner.firstName;
			$scope.custGroupOwnerName = $scope.firstName;
		}
		if($scope.groupOwner.lastName)
		{
			$scope.custGroupOwnerName = $scope.firstName ? $scope.custGroupOwnerName +" "+ $scope.groupOwner.lastName : $scope.groupOwner.lastName;
		}
	};

	function getActiveAndMaturingCount(){
		 return customerGroupService.getConnectionProfileMetrics(connectionProfileFactory.sourceGroupNo).success(function(data, status, headers, config){			
		
		}).error(function(data, status, headers, config) {
			$scope.showError(data);
		});
	}

	function getMaturingFacilityCount(){
		 return customerGroupService.getConnectionMaturingFaciltiesCount(connectionProfileFactory.sourceGroupNo).success(function(data, status, headers, config){			
		
		}).error(function(data, status, headers, config) {
			$scope.showError(data);
		});
	}
	
	
	function getCustomerGroupDetail(){
		 return customerGroupService.custGroupDetails(connectionProfileFactory.sourceGroupNo).success(function (customerDetails, status, headers, config) {		
			
		}).error(function(data, status, headers, config) {
			$scope.showError(data);
		});
	}

	$scope.reLoadConnectionProfileMetrics = function(){
		getActiveAndMaturingCount().then(function(result){
			$scope.lendingDealsCount =result.data.resultObject.activeDealsCount;
		})
	};
	
	$scope.getMFacilityCount = function(){
		getMaturingFacilityCount().then(function(result){
			$scope.maturingFacilitiesCount = result.data.resultObject.maturingFacilitiesCount;
		})
	};
	
	$scope.selectTab  = function(index){
		$scope.selectedTabIndex = index;			
	};
	
	$scope.$on("$destroy", function() {
		$scope.layoutManager.header =Constants.headerURL.DEFAULT_HEADER;
	});


	$scope.loadTLAData	=	function(){
		$scope.showSpinner();
		$rootScope.isTLADataLoading	=	true;
		var promise = customerGroupService.fetchTLAData(connectionProfileFactory.sourceGroupNo);
		promise.then( function(result) {
			if(result.data.callSuccess){
				$rootScope.isTLADataLoaded	=	true;
				$rootScope.isTLADataLoading	=	false;
				$scope.isCustomerTypeMissingError=true;
				$scope.hideSpinner();
				//loadConnectionData();							
				//need to load financials data and update the page.
				loadEquity();
				loadCurrentLimit();
				$scope.getMFacilityCount();
			}else{			
				$scope.hideSpinner();
				$scope.TLAErrorList	=	result.data.errorList;
				$scope.removeScroller();
				if($scope.TLAErrorList[0].type == 'ESR CLEANSE REQUIRED ERROR') {
					var opr = ModalService.showESRCleanseModal($scope.TLAErrorList, $scope.user, connectionProfileFactory.sourceGroupNo).result;						
					
				} else {
					if($scope.TLAErrorList[0].subMessage != null){
						$scope.isCustomerTypeMissingError=true;
					}
					
					var op = ModalService.showTLAErrorModal($scope.TLAErrorList,$scope.user).result;	
				}

				$rootScope.isTLADataLoading	=	false;
			}
					
		},
		function(error) {
			console.log(error);
			$rootScope.isTLADataLoading	=	false;
			$scope.hideSpinner();
		});
	};


	$scope.loadDealDetails = function(){
		$scope.showSpinner();
		customerGroupService.TLAabortMsgs(connectionProfileFactory.sourceGroupNo).success(function(data,status, headers, config){
			$scope.TLAabortMsgs	=	$filter('orderBy')(data.resultObject.abortList, '-code', true);
			$scope.TLAabortMsgs	=	$filter('orderBy')($scope.TLAabortMsgs, '-type', true);
				
			if($scope.TLAabortMsgs	&&	$scope.TLAabortMsgs.length>0){
				$scope.isTLAabortErrorExists	=	false;
				if(data.resultObject.errorCount	>0){
					$scope.isTLAabortErrorExists	=	true;
					$rootScope.isTLADataLoaded	=	false;
					$scope.selectTab(TABS.CONNECTION_PROFILE);
				}
				$scope.hideSpinner();
				//$('#TLAabortMsgs').modal('show');
				$scope.removeScroller();
				var op = ModalService.showTLAAbortMessages($scope.TLAabortMsgs, $scope.isTLAabortErrorExists, connectionProfileFactory.sourceGroupNo).result;
				op.then(function( result ){
					if(result.action == 'start'){
						$scope.loadDealPage(result.dealId);
					}
				});
			}else{
				$scope.hideSpinner();
				var dealId = data.resultObject;
				$scope.loadDealPage(dealId);
			}
		}).error(function(data, status, headers, config) {
		   $rootScope.dealId ='';
		   $scope.error = true;
		   $scope.showError(data);
		});
			
	};
		
	$scope.loadDealPage = function(dealId){			
		$rootScope.dealId = dealId;
		custGroupDetailFactory.searchedDealForCG.brokerId = null;
		$location.path("/dealPage");			
	};

	function loadEquity(){
		
		var custGroupId = custGroupDetailFactory.custGroupId;
		if(custGroupId !== undefined){
			customerGroupService.getEquityForCustomerGroup(custGroupId).success(function(equityData,status, headers, config){
			 //$rootScope.customerGroupEquity= equityData;
			 connectionProfileFactory.financials.availableEquity = equityData;
			 
			}).error(function(data, status, headers, config) {
				$scope.customerId ='';
				$scope.showError(data);
			});
		}	
	}
			
	function loadCurrentLimit(){
		
		var custGroupId = custGroupDetailFactory.custGroupId;
		$scope.isCurrentLimitsExists	=	false;
		if(custGroupId !== undefined){
			customerGroupService.getCurrentLimitForCustomerGroup(custGroupId).success(function(currentLimitData,status, headers, config){
				//$rootScope.CustomerGroupCurrentLimit= currentLimitData[0];
				connectionProfileFactory.financials.tae = {};
				connectionProfileFactory.financials.tae.currentLimit = currentLimitData[0];
				//var	totalCurrentLimit	=	$rootScope.CustomerGroupCurrentLimit['AggregateExposure']+$rootScope.CustomerGroupCurrentLimit['Business Lending']+$rootScope.CustomerGroupCurrentLimit['Equipment Finance']+$rootScope.CustomerGroupCurrentLimit['Home Lending']+$rootScope.CustomerGroupCurrentLimit['Unsecured'];
				var	totalCurrentLimit	=	connectionProfileFactory.financials.tae.currentLimit['AggregateExposure']+connectionProfileFactory.financials.tae.currentLimit['Business Lending']+connectionProfileFactory.financials.tae.currentLimit['Equipment Finance']+connectionProfileFactory.financials.tae.currentLimit['Home Lending']+connectionProfileFactory.financials.tae.currentLimit['Unsecured'];
				//$rootScope.CustomerGroupCALLimit = currentLimitData[1];
				connectionProfileFactory.financials.tae.calLimit = currentLimitData[1];
				connectionProfileFactory.financials.tae.currentLimit.businessTAE = connectionProfileFactory.financials.tae.currentLimit['Business Lending'] + connectionProfileFactory.financials.tae.currentLimit['Equipment Finance'] + connectionProfileFactory.financials.tae.currentLimit['IPF'] + connectionProfileFactory.financials.tae.currentLimit['Business Unsecured'];
				connectionProfileFactory.financials.tae.currentLimit.consumerTAE = connectionProfileFactory.financials.tae.currentLimit['Consumer Lending'];
				
				$scope.childControllerHandler.createDonut();
			}).error(function(data, status, headers, config) {
				$scope.customerId ='';
				$scope.showError(data);
			});
		}	
	}

	$scope.getTLADataOrStartDeal = function(){
		if($rootScope.isTLADataLoaded){
			$scope.loadDealDetails();
		} else {
			$scope.loadTLAData();
		}
	}
		
		
}]);
