angular.module('macApp').controller('connectionProfile.connectionProfileMaturingCtrl', ['$scope', 'Constants', 'customerGroupService', 'ngTableParams', 'connectionProfileFactory', 'dealService', '$q', '$filter', '$rootScope', 'ModalService', 'connectionProfileModalService', 'custGroupFacilitiesFactory','modifyFacilityUiService',
    function($scope, Constants, customerGroupService, ngTableParams, connectionProfileFactory, dealService, $q, $filter, $rootScope, ModalService, connectionProfileModalService, custGroupFacilitiesFactory,modifyFacilityUiService) {

        $scope.rolloverFacilitiesDTO = {};
        $scope.init = function() {
            var initializeMaturingFacilitiesTable = function() {
                $scope.expiredFacilitiesTableParams = new ngTableParams({
                    page: 1,
                    count: 15
                }, {
                    paginationMaxBlocks: 13,
                    paginationMinBlocks: 2,
                    data: connectionProfileFactory.maturingFacilties.expired
                });
                $scope.maturingFacilitiesTableParams = new ngTableParams({
                    page: 1,
                    count: 15
                }, {
                    paginationMaxBlocks: 13,
                    paginationMinBlocks: 2,
                    data: connectionProfileFactory.maturingFacilties.maturing
                });
            }

            if (!connectionProfileFactory.isMaturingFacilitiesLoaded) {

                /* Show spinner to hold until data loads*/
                $scope.showSpinner();

                /* Call to get maturing facilities */
                //var getMaturingFacilities = customerGroupService.getMaturingFacilities({customerGrpId : connectionProfileFactory.sourceGroupNo});
                var getMaturingFacilities = customerGroupService.getMaturingFacilities(connectionProfileFactory.sourceGroupNo);
                /* Initiate tables after receiving the response */
                getMaturingFacilities.then(function(responseArray) {
                        connectionProfileFactory.maturingFacilties.expired = responseArray.data.resultObject[0];
                        connectionProfileFactory.maturingFacilties.maturing = responseArray.data.resultObject[1];
                        initializeMaturingFacilitiesTable();
                        connectionProfileFactory.isMaturingFacilitiesLoaded = true;
                        $scope.hideSpinner();
                    },
                    function(errorResponse) {
                        console.log(errorResponse);
                        $scope.hideSpinner();
                    });

            } else {
                initializeMaturingFacilitiesTable();
            }
        };

        $scope.getMaturityDate = function(epochValue) {
            if (typeof epochValue === "number") {
                return $scope.getFormattedDate(new Date(epochValue));
            } else {
                return null;
            }
        };

        $scope.onExtendButtonMouseOver = function($event) {
            var element = angular.element($event.currentTarget);
            element.parent().find("i").popover("show");
        };

        $scope.onExtendButtonMouseOut = function($event) {
            var element = angular.element($event.currentTarget);
            element.parent().find("i").popover("hide");
        };

        $scope.extendFacility = function(product) {
            $scope.showSpinner();
            $scope.productToBeExtended = product;
            $scope.getConnectionHealthCheck(connectionProfileFactory).then($scope.shouldEnableFastTrackCheck).then($scope.checkEligibilityForFastTrack).then($scope.checkApprovalCheckListEligibility);
        };

        $scope.getConnectionHealthCheck = function(connectionProfileFactory) {
            return customerGroupService
                .checkConnectionHealth(connectionProfileFactory.sourceGroupNo)
                .then(function(connectionHealthCheckresult) {
                    var checkResultObject = connectionHealthCheckresult.data.resultObject;
                    return checkResultObject;
                });

        };

        $scope.shouldEnableFastTrackCheck = function(connectionHealthCheckResultObject) {
            if (connectionHealthCheckResultObject.abortList === null) {
                return true;
            }
            var TLAabortMsgs = $filter('orderBy')(connectionHealthCheckResultObject.abortList, '-code', true);
            TLAabortMsgs = $filter('orderBy')(TLAabortMsgs, '-type', true);
            if ($.isArray(TLAabortMsgs)) {
                var isTLAabortErrorExists = connectionHealthCheckResultObject.errorCount > 0;
                var op = ModalService.showTLAAbortMessages(TLAabortMsgs, isTLAabortErrorExists, connectionProfileFactory.sourceGroupNo, false).result;
                $scope.hideSpinner();
                return op.then(function(result) {
                    if (result.action === 'start') {
                        return true;
                    }
                }, function() {
                    //console.log("error call back scenario of Dismiss/Close Modal");
                    $scope.hideSpinner();
                    return false;
                });
            }
            return true;
        };


        $scope.checkEligibilityForFastTrack = function(shouldEnableFastTrackCheck) {
            if (shouldEnableFastTrackCheck == true) {
                var productParam = {
                    "id": $scope.productToBeExtended.productId,
                    "sourceGroupNo": connectionProfileFactory.sourceGroupNo
                };
                return customerGroupService
                    .rollOverFTEligibilityCheck(productParam)
                    .then(function(checkEligibilityForFastTrackresult) {
                        if (checkEligibilityForFastTrackresult.data) {
                            if (checkEligibilityForFastTrackresult.data.errorList && checkEligibilityForFastTrackresult.data.errorList.length > 0) {
                                if (checkEligibilityForFastTrackresult.data.errorList[0].code == Constants.commonErrorCodes.PRODUCT_NOT_ELIGIBILE_FAST_TRACK_ERR_CODE) {
                                    var dealId = checkEligibilityForFastTrackresult.data.resultObject.dealId;
                                    $scope.loadDealPageAndExtend(dealId);
                                    return false;
                                } else {
                                    console.error(checkEligibilityForFastTrackresult.data.errorList[0].message);
                                    alert(checkEligibilityForFastTrackresult.data.errorList[0].message);
                                }
                            } else {
                                $scope.hideSpinner();
                                $scope.rolloverFacilitiesDTO.approvalCheckList = checkEligibilityForFastTrackresult.data.resultObject.approvalCheckList;
                                $scope.productToBeExtended.sourceGroupNo = connectionProfileFactory.sourceGroupNo;
                                $scope.rolloverFacilitiesDTO.productDto = $scope.productToBeExtended;
                                $scope.rolloverFacilitiesDTO.productDto.sourceGroupNo = connectionProfileFactory.sourceGroupNo;
                                $scope.removeScroller();
                                var op = connectionProfileModalService.showMaturingFacilitiesFTApprovalCheckList($scope.rolloverFacilitiesDTO).result;
                                return op.then(function(result) {
                                    if (result === 'next') {
                                        $scope.showSpinner();
                                        return customerGroupService.rollOverApprovalChecklistEligibilityCheck($scope.rolloverFacilitiesDTO).then(
                                            function(approvalCheckListEligibilityResult) {
                                                return approvalCheckListEligibilityResult;
                                            });
                                    }
                                }, function() {
                                    $scope.hideSpinner();
                                    return false;
                                });
                            }
                            $scope.hideSpinner();
                            return false;
                        }
                    });
            }
            $scope.hideSpinner();
            return false;
        };

        $scope.checkApprovalCheckListEligibility = function(approvalCheckListEligibilityResult) {
            if (approvalCheckListEligibilityResult.data) {
                if (approvalCheckListEligibilityResult.data.errorList && approvalCheckListEligibilityResult.data.errorList.length > 0) {
                    if (approvalCheckListEligibilityResult.data.errorList[0].code == Constants.commonErrorCodes.ROLLOVER_APPROVAL_CHECKLIST_ELIGIBILITY_FAILURE) {
                    	 //US 1821
                        var dealId = approvalCheckListEligibilityResult.data.resultObject.dealId;
                        //$scope.loadDealPageAndExtend(dealId);
                        $scope.hideSpinner();
                    	var mfFTWzrdunsuccessApprovalChecklistMaturingFacModal=connectionProfileModalService.showUnsuccessApprovalChecklistMaturingFacModal( dealId, $scope);
                    	 
                    } else {
                        console.error(approvalCheckListEligibilityResult.data.errorList[0].message);
                        alert(approvalCheckListEligibilityResult.data.errorList[0].message);
                    }
                } else {
                    $scope.rolloverFacilitiesDTO.productDto = approvalCheckListEligibilityResult.data.resultObject.productDto;
                    $scope.rolloverFacilitiesDTO.customerDetails = approvalCheckListEligibilityResult.data.resultObject.customerDetails;
                   $scope.rolloverFacilitiesDTO.supportingDocImaged = approvalCheckListEligibilityResult.data.resultObject.supportingDocImaged;
                    var mfFtWzrd2 = connectionProfileModalService.showMaturingFacilitiesFTRollOverDetails($scope.rolloverFacilitiesDTO, $scope, false);
                    $scope.hideSpinner();
                }
            }
        }

        $scope.loadDealPageAndExtend = function(dealId){
            custGroupFacilitiesFactory.productToBeExtended = $scope.productToBeExtended;
            $scope.loadDealPage(dealId);
        }
        
        $scope.isLuiIdApplicable = function(luiId,productTypeId){
			return modifyFacilityUiService.isLuiIdApplicable(luiId,productTypeId);
		}

    }
]);