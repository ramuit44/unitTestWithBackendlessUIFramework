angular.module('macApp').controller('connectionProfile.connectionProfileDealsCtrl',[ '$scope','Constants','customerGroupService','ngTableParams','connectionProfileFactory','dealService','$q',
	function($scope, Constants, customerGroupService, ngTableParams, connectionProfileFactory, dealService, $q) {
	
	$scope.init = function(){

		/* Initialize constants */
		$scope.LABELS = Constants.connProfile.labels;
		$scope.DEAL_STATUS_TEXT = Constants.connProfile.dealStatusText;
	
		/* Table configuration for active deals */
		var initializeActiveDealsTable = function(){
			$scope.activeDealTableParams = new ngTableParams({page:1, count: 15}, { paginationMaxBlocks: 13, paginationMinBlocks: 2,  data : connectionProfileFactory.lendingDeals.activeDeals});
		}
		
		/* 	Table configuration for submitted deals with page number
			Changing the paginationMaxBlocks will limit the number of page numbers displayed at a time
		 */
		var initializeSubmittedDealsTable = function(){
			$scope.submittedDealTableParams = new ngTableParams({page:1, count: 15}, { paginationMaxBlocks: 13, paginationMinBlocks: 2, data : connectionProfileFactory.lendingDeals.submittedDeals	});
		}


		if(!connectionProfileFactory.isDealsLoaded){

			/* Show spinner to hold until data loads*/
			$scope.showSpinner();
			
			/* Call to get active deals */
			var getActiveDeals = customerGroupService.dealsForCustomerGroup1({customerGrpId : connectionProfileFactory.sourceGroupNo, dealStatusSearchStr : Constants.connProfile.activeDealCodes});
			
			/* Call to get submitted deals */
			var getSubmittedDeals = customerGroupService.dealsForCustomerGroup1({customerGrpId : connectionProfileFactory.sourceGroupNo, dealStatusSearchStr : Constants.connProfile.submittedDealCodes});

			/* Initiate tables after receiving the response for all */
			$q.all([getActiveDeals, getSubmittedDeals]).then(function(responseArray){
				connectionProfileFactory.lendingDeals.activeDeals = responseArray[0].data.resultObject;
				connectionProfileFactory.lendingDeals.submittedDeals = responseArray[1].data.resultObject;
				initializeActiveDealsTable();
				initializeSubmittedDealsTable();
				connectionProfileFactory.isDealsLoaded = true;
				$scope.hideSpinner();
			},
			function(errorResponse){
				$scope.hideSpinner();
				console.log(errorResponse);
			});
			
		}else{
			initializeActiveDealsTable();
			initializeSubmittedDealsTable();
		}
	
	};

	$scope.getOnHoverContentString = function(currentRow){
		if (currentRow.dealStatus === Constants.dealStatus.EXPIRED){
			if(currentRow.productRefreshedDate ==''){
				return 'The deal has expired. To submit, start a new deal.';
			}else{
				return 'The deal has expired as the last product refresh date was on '+ currentRow.productRefreshedDate +' which exceeds the limit of 18 days. To submit, start a new deal.';
			}
		}
		else{
			return 'Click to view the TLA status of your deal.';
		}
	};
	
	$scope.getDecisionStatus= function(currentRow){
		if (currentRow.dealStatus == Constants.dealStatus.EXPIRED && currentRow.decisionStatus == "No Decision"){	
			return '-';
		}else {
			return currentRow.decisionStatus;
		}
	};

	/* 
		Function for handling click on Lola deal id in a deal
		Populate sourceGroupNo & customerGroupName and invoke redirectDeal fo dealService 
	*/
	$scope.redirectDeal	= function(deal){

		deal.sourceGroupNo = connectionProfileFactory.sourceGroupNo;
		deal.customerGroupName = connectionProfileFactory.connection.groupName;
		dealService.redirectDeal(deal, $scope);

	};

	$scope.deleteDeal = function(deal){
		var deleteDeal = customerGroupService.deleteDeal(deal.dealId);
		deleteDeal.then(function(response){
			connectionProfileFactory.isDealsLoaded = false;
			$scope.reLoadConnectionProfileMetrics();
			$scope.init();
		});
	};
	
	/* 
		Function for handling click on status in a deal
		Populate sourceGroupNo & customerGroupName and invoke redirectDealBasedOnStatus fo dealService 
	*/
	$scope.redirectDealBasedOnStatus = function(deal){

		deal.sourceGroupNo = connectionProfileFactory.sourceGroupNo;
		deal.customerGroupName = connectionProfileFactory.connection.groupName;
		dealService.redirectDealBasedOnStatus(deal, $scope.user, $scope);

	};

	$scope.isDealsubmittedToTLA = function(status){

		return dealService.isDealsubmittedToTLA(status);

	};

}]);
