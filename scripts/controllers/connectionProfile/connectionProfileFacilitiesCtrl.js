angular.module('macApp').controller('connectionProfile.connectionProfileFacilitiesCtrl', ['$scope', 'Constants', 'customerGroupService', 'connectionProfileFactory', '$filter', 'staticDataService', '$q','$timeout',
    function($scope, Constants, customerGroupService, connectionProfileFactory, $filter, staticDataService, $q, $timeout) {

        //initialization code goes here
        $scope.init = function() {
            //constants - check on the approach
            $scope.borrowerDTOList = [];
            $scope.unsupportedGuaranteeList = [];
            $scope.assetOwnerDTOList = [];
            $scope.loadConnectionData();
            $scope.enableSecurityView = false;

        };



        $scope.enableDisableSecurityView = function(flag) {
            $scope.enableSecurityView = flag;
        };





        var intializeFacilityAndSecurityData = function() {
            if (connectionProfileFactory.FacilitiesSecuritiesForCG.assetOwnerDTOList != null)
                $scope.assetOwnerDTOList = connectionProfileFactory.FacilitiesSecuritiesForCG.assetOwnerDTOList;
            if (connectionProfileFactory.FacilitiesSecuritiesForCG.borrowerDTOList != null)
                $scope.borrowerDTOList = connectionProfileFactory.FacilitiesSecuritiesForCG.borrowerDTOList;
            if (connectionProfileFactory.FacilitiesSecuritiesForCG.unsupportedGuaranteeList != null)
                $scope.unsupportedGuaranteeList = connectionProfileFactory.FacilitiesSecuritiesForCG.unsupportedGuaranteeList;
        };



        //Securities and Facilities For CustGroup
        $scope.loadConnectionData = function() {
            if (!connectionProfileFactory.isFacilitiesSecuritiesLoaded) {

                /* Show spinner to hold until data loads*/
                $scope.showSpinner();

                var facilitySecurityPromise = customerGroupService.getFacilitiesSecuritiesForCG(connectionProfileFactory.sourceGroupNo);
                var assetReferenceDataPromise = staticDataService.getReferenceDataCollection("guaranteeTypeList,positionList,unsupportedGuaranteeSubTypeList,supportedGuaranteeSubTypeList");
                $q.all([facilitySecurityPromise, assetReferenceDataPromise]).then(function(responseArray) {
                        connectionProfileFactory.FacilitiesSecuritiesForCG = responseArray[0].data.resultObject;
                        angular.forEach(responseArray[1].data.resultObject, function(referenceData){
                        	switch(referenceData.referenceDataGroupName){
                        		case "guaranteeTypeList":{
                        			$scope.guaranteeFamilyList = referenceData.referenceDataList;
                        			break;
                        		}
                        		case "positionList":{
                        			$scope.roleList = referenceData.referenceDataList;
                        			break;
                        		}
                        		case "unsupportedGuaranteeSubTypeList":{
                        			$scope.guaranteeTypeListUnsupported = referenceData.referenceDataList;
                        			break;
                        		}
                        		case "supportedGuaranteeSubTypeList":{
                        			$scope.guaranteeTypeListSupported = referenceData.referenceDataList;
                        			break;
                        		}
                        	}
                        });
                        intializeFacilityAndSecurityData();
                        connectionProfileFactory.isFacilitiesSecuritiesLoaded = true;
                        $scope.hideSpinner();
                        
                    },
                    function(errorResponse) {
                        $scope.hideSpinner();
                        console.log(errorResponse);
                    });
            } else {
                intializeFacilityAndSecurityData();
            }

        };


        $scope.getBsbAndAccount = function(facility) {
            if (facility && facility.account) {
                var b = facility.account.bsb;
                var a = facility.account.accountNumber;

                if (!b && !a) {
                    return '';
                }
                if (!b && a) {
                    return a;
                }

                if (b && !a) {
                    return b;
                }

                return b + ' - ' + a;
            }
            return '';
        };


        $scope.getRepaymentAmount = function(amount, repaymentType) {
            if (amount) {
                return $filter('currency')(amount);
            } else {
                if (repaymentType) {
                    if (repaymentType == 'IO' || repaymentType == 'IOA' || repaymentType == 'CI' || repaymentType == 'SL' || repaymentType == 'N/A') {
                        return "N/A";
                    } else {
                        return "-";
                    }
                } else {
                    return "-";
                }
            }
        };


        $scope.validateReductionBasis = function(product) {
            if (product == null) {
                return false;
            }
            if (product) {
                if (product.repaymentType) {
                    if (product.repaymentType == 'IO' || product.repaymentType == 'IOA' || product.repaymentType == 'CI' || product.repaymentType == 'SL' || product.repaymentType == 'N/A') {
                        return true;
                    }
                } else {
                    product.repaymentType = '-';
                    return false;
                }
            }
            return true;
        };


        $scope.getTermAndMaturingDate = function(termAndMaturingDate, flag) {

            var termAndMaturingDateResult = "";
            var onlyTerm = "TERM_ONLY";
            var onlyMaturingDate = "MATURINGDATE_ONLY";

            if (termAndMaturingDate != null && termAndMaturingDate != "N/A") {
                termAndMaturingDateResult = termAndMaturingDate;
            } else if (termAndMaturingDate == null || termAndMaturingDate == "N/A") {
                termAndMaturingDateResult = "0yrs 0mths";
            }

            if (typeof(flag) != 'undefined' && flag != null) {

                if (flag === onlyTerm) {
                    if ((termAndMaturingDateResult.indexOf("-")) > -1) {

                        var res = termAndMaturingDateResult.split("-");

                        if (res[1] === undefined || res[1] == null || res[1].length <= 0) return "";

                        else return res[1];

                    } else {
                        return termAndMaturingDateResult;
                    }

                } else if (flag === onlyMaturingDate) {

                    if ((termAndMaturingDateResult.indexOf("-")) > -1) {

                        var res = termAndMaturingDateResult.split("-");

                        if (res[0] === undefined || res[0] == null || res[0].length <= 0) return "";

                        else return res[0];

                    } else {
                        return "-";
                    }

                }
            } else {
                return termAndMaturingDateResult;
            }
        };



        $scope.getProductMargin = function(facility) {
            var rlt = '0%';
            if (facility.interestRate.productMargin != null) {
                rlt = facility.interestRate.productMargin + '%';
            }
            return rlt;
        };

        $scope.getCustomerRiskMargin = function(facility) {
            var rlt = '-';
            if (!facility || !facility.interestRate || !facility.interestRate.customerRiskMargin) {
                return rlt;
            }
            // US2183 BR1
            if ($scope.isCreditCardOrGuarantees(facility)) {
                return rlt;
            }
            rlt = facility.interestRate.customerRiskMargin + '%';
            return rlt;
        };

        $scope.isCreditCardOrGuarantees = function(facility) {
            if (!facility || !facility.productCategory || !facility.productCategory.productFamilyId) {
                return false;
            }
            if (facility.productCategory.productFamilyId === 9 || facility.productCategory.productFamilyId === 10) {
                return true;
            }
            return false;
        };

        $scope.splitassetOwner = function(asset) {
            if (asset.assetOwnerNameWithPercentage != null) {
                asset.assetOwnerNameList = asset.assetOwnerNameWithPercentage.split(',');
            }
        };
        
        
        $scope.assetGroup = function(assetType,groupType){
        	for(var i=0; i<groupType.length; i++){
    			var obj = groupType[i];
    			for ( var key in obj) {
        			if (obj[key].indexOf(assetType) > -1) {        				
        				return $scope.assetGroupIconDetails = {
        						iconText : key,
        			        	hoverText : Constants.assetTypeName[key]
        				};
        			}
        		}
    		}
        };
        
       
        $scope.getAssetGroup = function(asset) {
        	$scope.assetGroup(asset.assetCategory.assetTypeId,Constants.assetGroupType);
        	$scope.assetGroup(asset.assetCategory.assetFamilyId,Constants.assetFamilyGroupType);    	
        };


        /*$scope.getAssetGroup = function(asset) {
        	if (Constants.assetGroupType.RP.indexOf(asset.assetCategory.assetTypeId) > -1) {
                $scope.assetGroupIconDetails = {
						iconText :"RP",
						hoverText : "Residential Property"};
            } else if (Constants.assetGroupType.CP.indexOf(asset.assetCategory.assetTypeId) > -1) {
                $scope.assetGroupIconDetails = {
						iconText :"CP",
						hoverText : "Commercial Property"};
            } else if (Constants.assetGroupType.TD.indexOf(asset.assetCategory.assetTypeId) > -1) {
                $scope.assetGroupIconDetails = {
						iconText :"TD",
						hoverText : "Term Deposit"};
            } else if (Constants.assetGroupType.PL.indexOf(asset.assetCategory.assetTypeId) > -1) {
                $scope.assetGroupIconDetails = {
						iconText :"PL",
						hoverText : "Pledged Asset"};
            } else if (Constants.assetFamilyGroupType.MV.indexOf(asset.assetCategory.assetFamilyId) > -1) {
                $scope.assetGroupIconDetails = {
						iconText :"MV",
						hoverText : "Motor Vehicle"};
            } else if (Constants.assetFamilyGroupType.EQ.indexOf(asset.assetCategory.assetFamilyId) > -1) {
                $scope.assetGroupIconDetails = {
						iconText :"EQ",
						hoverText : "Office Equipment"};
            } else if (Constants.assetFamilyGroupType.BA.indexOf(asset.assetCategory.assetFamilyId) > -1) {
                $scope.assetGroupIconDetails = {
						iconText :"BA",
						hoverText : "Specialised Business Asset"};
            } else if (Constants.assetFamilyGroupType.PM.indexOf(asset.assetCategory.assetFamilyId) > -1) {
                $scope.assetGroupIconDetails = {
						iconText :"PM",
						hoverText : "Plant Machinery"};
            } else if (Constants.assetFamilyGroupType.FP.indexOf(asset.assetCategory.assetFamilyId) > -1) {
                $scope.assetGroupIconDetails = {
						iconText :"FP",
						hoverText : "Farm Product"};
            } else if (Constants.assetFamilyGroupType.SC.indexOf(asset.assetCategory.assetFamilyId) > -1) {
                $scope.assetGroupIconDetails = {
						iconText :"SC",
						hoverText : "Securities Asset"};
            } else if (Constants.assetFamilyGroupType.AM.indexOf(asset.assetCategory.assetFamilyId) > -1) {
                $scope.assetGroupIconDetails = {
						iconText :"AM",
						hoverText : "Aircraft Marine Asset"};
            }
            
        };*/

        $scope.getAssociatedProductList = function(security) {

            if (!security || !security.associatedProductList) {
                return [];
            }
            return security.associatedProductList;
        };

        $scope.splitaccountOwnerName = function(facility) {
            facility.accountOwnerNameList = [];
            if (facility.accountOwnerName) {
                facility.accountOwnerNameList = facility.accountOwnerName.split('|');
            }
        };

        $scope.getRefDataLabel = function(refDataList, id) {
            if (id === 0) {
                return "";
            }
            if (refDataList !== null && refDataList !== undefined && refDataList !== "") {
                for (var i = 0; i < refDataList.length; i++) {
                    if (id && refDataList[i].key === id) {
                        return refDataList[i].name;
                    }
                }
            }
        };

        $scope.getWaiveLegalAdvice = function(val) {
            return val ? "Yes" : "No";
        };

    }
]);