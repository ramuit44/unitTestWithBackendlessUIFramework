macApp.service('modifyFacilityUiService', [
		'$q',
		'$rootScope',
		'$filter',
		'CONST','Constants',
		function($q, $rootScope, $filter,CONST,Constants) {
			var modifyFacilityUiService = {};

			var BBBL_FAMILY_ID = 23;
			var BUSINESS_ONE_FAMILY_ID = 6;
			var BBBL_VR_PRODUCT_ID = 232;
			var applicableLuiIds = [46,47,48,49];
			var defaultVisible = {
				isBusinessLoanMarginInRates : false,
				isTermPremiumInRates : false,
				isProductMarginInRates : false,
				isBusinessOneMarginInRates : false,
				applicableLuiCodes : []
			};

			var uiDataStructure = [  {//isLuiIdnotApplicable : 
				isBusinessLoanMarginInRates : false,
				isTermPremiumInRates : false,
				isProductMarginInRates : false,
				isBusinessOneMarginInRates : false,
				applicableProdFamilyId : BBBL_FAMILY_ID,
				applicableLuiCodes : [ "163", "164", "165", "166", "167", "168", "169", "170","171","172","173","143","144","125" ]
			}, {//isLuiIdareApplicable : 
				isBusinessLoanMarginInRates : true,
				isTermPremiumInRates : false,
				isProductMarginInRates : false,
				isBusinessOneMarginInRates : false,
				applicableProdFamilyId : BBBL_FAMILY_ID,
				applicableLuiCodes : [ "159", "160", "161", "162"  ]
			}, {//businessOneMarginVisible : 
				isBusinessLoanMarginInRates : false,
				isTermPremiumInRates : false,
				isProductMarginInRates : false,
				isBusinessOneMarginInRates : true,
				applicableProdFamilyId : BUSINESS_ONE_FAMILY_ID,
				applicableLuiCodes : [ "156", "157", "158" ]
			}, { //productMarginBusinessOneVariation : 
				isBusinessLoanMarginInRates : false,
				isTermPremiumInRates : false,
				isProductMarginInRates : true,
				isBusinessOneMarginInRates : false,
				applicableProdFamilyId : BUSINESS_ONE_FAMILY_ID,
				applicableLuiCodes : [ "145", "146", "147" ]
			}];

			modifyFacilityUiService.triggerUiRule = function(luiList, familyId, selectedLuiKey) {
				var detectedLui = $filter('filter')(luiList, {
					key : selectedLuiKey
				}, true);
				if (detectedLui.length) {
					var luiNode = detectedLui[0];
					for(var i=0;i<uiDataStructure.length;i++){
						if (familyId === uiDataStructure[i].applicableProdFamilyId
								&& uiDataStructure[i].applicableLuiCodes.indexOf(luiNode.code) !== -1) {
							return uiDataStructure[i];
						}
					};
				}
				return defaultVisible;

			};
			
			modifyFacilityUiService.calculateLolaDiffResultantRate = function(baseRate,customerRiskMargin,shading,smsfMargin, businessLoanMargin, businessBillMargin, termPremiumMargin, businessOneMargin, productTypeId){
				if(!baseRate	||	baseRate==undefined){
					baseRate	=	0;
				}
				
				if(!customerRiskMargin	||	customerRiskMargin==undefined){
					customerRiskMargin	=	0;
				}
				
				if(!smsfMargin	||	smsfMargin==undefined){
					smsfMargin	=	0;
				}
				
				if(!businessBillMargin	||	businessBillMargin==undefined){
					businessBillMargin	=	0;
				}
				
				if(!businessLoanMargin	||	businessLoanMargin==undefined){
					businessLoanMargin	=	0;
				}

				if(!termPremiumMargin	||	termPremiumMargin==undefined){
					termPremiumMargin	=	0;
				}
				
				if(!businessOneMargin	||	businessOneMargin==undefined){
					businessOneMargin	=	0;
				}
				
				if(!shading	||	shading	==	undefined){
					shading	=	0;
				}
				
				if(isNaN(parseFloat(baseRate) + parseFloat(customerRiskMargin) + parseFloat(businessOneMargin) - parseFloat(shading) - parseFloat(smsfMargin) + parseFloat(businessLoanMargin) + parseFloat(termPremiumMargin) + parseFloat(businessBillMargin) )){
					return "";
				} else if (productTypeId===113 || productTypeId===145 || productTypeId===98 || productTypeId===150 || productTypeId===115 || productTypeId===152 || productTypeId===142 || productTypeId===95){
					var output =  Math.round((parseFloat(baseRate) - parseFloat(shading) + parseFloat(smsfMargin) ) * 1000) / 1000;//1000 due to 3 decimal places
					return (output<0)?undefined:output;
				} else{
					var output =  Math.round((parseFloat(baseRate) + parseFloat(customerRiskMargin) + parseFloat(businessOneMargin) - parseFloat(shading) + parseFloat(smsfMargin) + parseFloat(businessLoanMargin) + parseFloat(termPremiumMargin) + parseFloat(businessBillMargin)) * 1000) / 1000;
					return (output<0)?undefined:output;
				}
			};

			modifyFacilityUiService.getTerm = function(frequencyId, years, months){
	            var term = 0;
	            
	            switch(frequencyId){
	                case Constants.RepaymentFrequencyTypes.WEEKLY:{
	                    term = years * Constants.RepaymentFrequencyValues.WEEKLY+months*4;
	                    break;
	                }
	                case Constants.RepaymentFrequencyTypes.FORTNIGHTLY:{
	                    term = years * Constants.RepaymentFrequencyValues.FORTNIGHTLY+months*2;
	                    break;
	                }
	                case Constants.RepaymentFrequencyTypes.MONTHLY:{
	                    term = years * Constants.RepaymentFrequencyValues.MONTHLY+months*12;
	                    break;
	                }
	                case Constants.RepaymentFrequencyTypes.QUARTERLY:{
	                    term = years * Constants.RepaymentFrequencyValues.QUARTERLY+months/3;
	                    break;
	                }
	                case Constants.RepaymentFrequencyTypes.HALFYEARLY:{
	                    term = years * Constants.RepaymentFrequencyValues.HALFYEARLY+months/6;
	                    break;
	                }
	                case Constants.RepaymentFrequencyTypes.YEARLY:{
	                    term = years * Constants.RepaymentFrequencyValues.YEARLY+months/12;
	                    break;
	                }
	            }

	            return term;
	        }

	        modifyFacilityUiService.getCalcInterestValue = function(frequencyId, effRate){
	            var i   =   0;
	            var IR  =   effRate;
	            switch(frequencyId){
	                case Constants.RepaymentFrequencyTypes.WEEKLY:{
	                    i   =   (IR/100)/Constants.RepaymentFrequencyValues.WEEKLY;
	                    break;
	                }
	                case Constants.RepaymentFrequencyTypes.FORTNIGHTLY:{
	                    i   =   (IR/100)/Constants.RepaymentFrequencyValues.FORTNIGHTLY;
	                    break;
	                }
	                case Constants.RepaymentFrequencyTypes.MONTHLY:{
	                    i   =   (IR/100)/Constants.RepaymentFrequencyValues.MONTHLY;
	                    break;
	                }
	                case Constants.RepaymentFrequencyTypes.QUARTERLY:{
	                    i   =   (IR/100)/Constants.RepaymentFrequencyValues.QUARTERLY;
	                    break;
	                }
	                case Constants.RepaymentFrequencyTypes.HALFYEARLY:{
	                    i   =   (IR/100)/Constants.RepaymentFrequencyValues.HALFYEARLY;
	                    break;
	                }
	                case Constants.RepaymentFrequencyTypes.YEARLY:{
	                    i   =   (IR/100)/Constants.RepaymentFrequencyValues.YEARLY;
	                    break;
	                }
	            }
	            
	            return i;
	        };
	        
	        modifyFacilityUiService.isLuiIdApplicable = function(luiId,productTypeId){
            	if(BBBL_VR_PRODUCT_ID == productTypeId)
            	{
            		if(applicableLuiIds.indexOf(luiId)!=-1) {
						return true;
	            	}
	            	else{
	            		return false;
	            	} 
            	}
	            return true;  		
	        };
			
			return modifyFacilityUiService;
		}]);