angular.module('macApp').controller('connectionProfile.connectionProfileCustomersCtrl',[ '$scope','Constants','customerGroupService','connectionProfileFactory','customerService','ngTableParams',
                                                                                         function($scope, Constants,customerGroupService,connectionProfileFactory,customerService,ngTableParams) {

	//initialization code goes here
	$scope.init = function(){
		$scope.customerGroups = [];
		$scope.customerGroupsTableParams = new ngTableParams({}, { counts:[], 
			getData: $scope.getDataForCustomerGroupsTableParams
		});
	};
	
	$scope.getDataForCustomerGroupsTableParams = function ($defer, params) {
		if(connectionProfileFactory.customersList.length > 0 ){
			$defer.resolve(connectionProfileFactory.customersList);
			
		}else{
			customerGroupService.customersForCustGroup(connectionProfileFactory.sourceGroupNo).then(function(response) {
				console.log("$scope.customerGroupsTableParams - with value -" + JSON.stringify(response));
				$scope.customerGroups = response.data;
				params.parameters.count = response.data.length;
				for(var index in $scope.customerGroups) {
					var customer = $scope.customerGroups[index];
					connectionProfileFactory.customersList.push(customerService.processCustomerDetails(customer));
				}
				$defer.resolve(connectionProfileFactory.customersList);
			});

		}
	};

	$scope.checkBlankField = function(FieldModelValue){
		if(FieldModelValue===undefined || FieldModelValue===null || FieldModelValue===""){
			return "";
		}
		return FieldModelValue;
	};
	
    $scope.isAddressExist	=	function(address){
		if(address){
			if((address.unitNumber)	||	(address.floorNumber)	||	(address.streetNumber)	||	(address.streetName) ||	(address.streetTypeName) ||	(address.suburb) ||	(address.stateName)	
					||	(address.countryCode)	||	(address.postcode))
			{
				return true;
			}else{
				false;
			}
		}
		return false;
	};

}]);
