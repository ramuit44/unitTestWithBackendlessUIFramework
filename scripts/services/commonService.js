/*global $, utag, describe, beforeEach, module, inject, it, expect, app, ko, Raphael, require, angular, setInterval, clearInterval, jQuery, define, KeyEvent, setTimeout, clearTimeout, AccessifyHTML5, log */
macApp.service('commonService',['$http', function ($http){
	return {			
		logout : function(){			
			return	$http.post('./logout');
		},getLoggedInUserDetails : function($http){			
			return	$http.get('./loggedInUser');
		},getEnvDetails : function(){
			return	$http.post('./envDetails');
		},getUserTasks: function(){	    	
			return user.Tasks;
		}
	};
}]);

macApp.factory('sessionTimeoutInterceptor', ['sessionTimeoutService', function( sessionTimeoutService) {
	return {
		request: function(config) {
			
			sessionTimeoutService.resetNow();
			return config;
		},
		response: function(resp) {
			return resp;
		}
	};
}])



.config(['$httpProvider',function($httpProvider, sessionTimeoutService) {
	$httpProvider.interceptors.push('sessionTimeoutInterceptor');
		}]).service('sessionTimeoutService', ['$timeout', '$location','$rootScope', function($timeout, $location, $rootScope){
	var that = this;
	that.popupTime = 18 * 60 * 1000; // 18 mins
	that.redirectTime = 20 * 60 * 1000; // 20 mins
	that.popupTimer = null;
	that.redirectTimer = null;

	that.startNow = function() {
		that.popupTimer = $timeout(function() {
			$('#sessionTimeoutModal').modal('show');
		}, that.popupTime);
		that.redirectTimer = $timeout(function() {
			$('.modal').modal('hide');//hide bootstrap dialogs
			$rootScope.$broadcast('dismiss-dialog');//hide angular ui dialogs
			$location.path("/");
		}, that.redirectTime);
	};

	that.cancelNow = function() {
		$timeout.cancel(that.popupTimer);
		$timeout.cancel(that.redirectTimer);
	};

	that.resetNow = function() {
		that.cancelNow();
		that.startNow();
	};
}]);
