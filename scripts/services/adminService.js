macApp.factory('adminService',['$http', function($http){
	
	var _adminPageTabs	=	[
		                 		{
		                 			id:'NewUser',
		                 			name:'New User',
		                 			active:true,
		                 			viewTask:'EditUser',
		                 			editTask:''
		                 		},
		                 		{
		                 			id:'localBussinessBanker',
		                 			name:'Local Business Banker',
		                 			active:false,
		                 			viewTask:'EditUser',
		                 			editTask:'',		                 			url : 'app/views/admin/bankerForRegionalManager.html'
		                 		}	
	                 		];
	
return {
		getAdminPageTabs: _adminPageTabs,
		getUserDetails : function(userName){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return	$http.post('./getUserDetails',userName);
		},
		saveUserDetails : function(user){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return	$http.post('./saveUser',user);
		},
		addUserDetails : function(user){
            $http.defaults.headers.post['Content-Type'] = 'application/json'; 
			return	$http.post('./addUserDetails',user);
		},
		loadDropDownData : function(dropDownDataType){
			 $http.defaults.headers.post['Content-Type'] = 'application/json'; 
			return	$http.post('./referenceDropDownData', dropDownDataType);
		},
		loadRegionalManagerDropDownData : function(){
			 $http.defaults.headers.post['Content-Type'] = 'application/json'; 
			return	$http.post('./loadAllRegionalManager');
		},

		getSearchUser : function(searchUser){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return	$http.post('./searchUserPattern',searchUser);
		},
		getAdvSearchForUser : function(user){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return	$http.post('./advanceSearchForUser',user);
		},
		getlolaChangeDetails : function(lolaChangeDetailsType){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return $http.post('./lolaChangeDetails',lolaChangeDetailsType); 
		},
		updateLolaChangeDetails : function(lolaChangeDetails){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			console.log(lolaChangeDetails);
			return $http.post('./updateLolaChangeDetails',lolaChangeDetails);
		},
		getRulesForUpdate : function(ruleName){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return	$http.post('./getRulesForUpdate',ruleName);
		},
		updateRules : function(rule){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return	$http.post('./updateRules',rule);
		},
		refreshLolaCache : function($http){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return $http.post('./refreshLOLACache');
		},
		getBaseRateTypeList : function(){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return $http.post('./getBaseRateTypeList');
		},
		saveBaseRateType : function(modifiedBaseRateTypeList){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return $http.post('./saveBaseRateType',modifiedBaseRateTypeList);
		},
		deleteBaseRateType : function(id){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return $http.post('./deleteBaseRateType',id);
		},
		getAffordabilityCalculationRates : function(){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return $http.post('./getAffordabilityCalculationRates');
		},
		updateAffordabilityCalculationRate : function(affordabilityRateList){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return $http.post('./updateAffordabilityCalculationRate',affordabilityRateList);
		},
		getSystemParametersList : function(){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return $http.post('./getSystemParameterList');
		},
		updateSystemParameters : function(modifiedSystemParamList){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return $http.post('./updateSystemParameters',modifiedSystemParamList);
		},		
		updateConnectionRefreshDate : function(customerGroupId) {
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return $http.post('./updateConnectionRefreshDate', customerGroupId);
		}
	};
}]);