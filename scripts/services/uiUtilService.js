macApp.service('uiUtilService',['$http', function ($http){
	
	var _isRateValidation=function(rate){
		if(rate!==null && rate!==undefined ){
			if(!isNaN(rate)){
				if(rate<0 || rate>100){
					return false;
				}
			}else{
				return false;
			}
		}
		return true;
	};
	
	
	var _getBaseRateDropdown = function(rulesIdSource,currentBaseRatetypeList, dealProduct) {
		var newBaseRatetypeList = [];
		
		if (currentBaseRatetypeList == null)
			return newBaseRatetypeList;
		
		dealProduct.rateSection=(!dealProduct.rateSection)?{}:dealProduct.rateSection;

		for (var i = 0; i < currentBaseRatetypeList.length; i++) {
			if ((rulesIdSource === currentBaseRatetypeList[i].key || dealProduct.interestRate.currentBaseRateTypeId == currentBaseRatetypeList[i].key)) {

				newBaseRatetypeList
						.push(currentBaseRatetypeList[i]);

			}
			if ((dealProduct.interestRate.baseRateTypeId || dealProduct.interestRate.baseRateTypeId != 0)
					&& dealProduct.interestRate.baseRateTypeId == currentBaseRatetypeList[i].key
					&& (!dealProduct.rateSection.baseRateTypeIdSelected)) {
				dealProduct.rateSection.baseRateTypeIdSelected = currentBaseRatetypeList[i].key;
			}
		}

		return newBaseRatetypeList;

	};	
	
	var _showRatesTypeDropDown=function(rulesIdSource, dealProduct) {
		if(rulesIdSource==-1)
			return false;
		if(dealProduct!=null) {
			
			return dealProduct.interestRate.currentBaseRateTypeId!=null && parseInt(rulesIdSource)!= dealProduct.interestRate.currentBaseRateTypeId;
		}
		return false;
	};
	
	var _hasOverFlow = function(elementIdWithHash, thresholdRows) {
		if($(elementIdWithHash).hasClass('TwoLineEllipsis'))
			return true;
		var height = $(elementIdWithHash).height();
		var line_height = $(elementIdWithHash).css('line-height');
		line_height = parseFloat(line_height);
		var rows = height / line_height;
		return Math.round(rows)>thresholdRows;
	};
	
	
	var percentErrorText="Enter a numerical value > 0% and <=100%.";
	return {
		isRateValid : _isRateValidation,
		RATE_ERROR : percentErrorText,
		showRatesTypeDropDown:_showRatesTypeDropDown,
		getBaseRateDropdown:_getBaseRateDropdown,
		hasOverFlow:_hasOverFlow
	};
}]);
