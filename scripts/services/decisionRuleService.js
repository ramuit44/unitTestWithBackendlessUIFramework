
macApp.factory('decisionRuleService',['$http', function($http){
return {
		getDecisionRules : function(){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return	$http.post('./getDecisionRules','Decision');
		},
		saveDecisionRuleDetails : function(ruleResult){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return	$http.post('./saveDecisionRuleDetails',ruleResult);
		},
		updateRuleConfigDetails : function(ruleEntity){
			$http.defaults.headers.post['Content-Type'] = 'application/json';
			return	$http.post('./updateRuleConfigDetails',ruleEntity);
		}
	};
}]);