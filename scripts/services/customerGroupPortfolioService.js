macApp.factory('customerGroupPortfolioService',['$http', function($http){
	
	var customerGroupPortfolioService = {};
		
	customerGroupPortfolioService.getUserPortfolioConnections = function(portfolioId){			
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./fetchPortfolioConnections', portfolioId);
	};	
	
	customerGroupPortfolioService.getPortfolioDetailsSearchBy = function(userPortfolioDTO){			
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./searchPortfolios', userPortfolioDTO);
	};
	
	customerGroupPortfolioService.transferConnectionsToSelectedPortfolio = function(userPortfolioDTO){			
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./transferConnections', userPortfolioDTO);
	};
	
	customerGroupPortfolioService.addConnectionToPortfolio = function(userPortfolioDTO){			
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./addConnection', userPortfolioDTO);
	};
	
	customerGroupPortfolioService.assignPortfolioToUser = function(userPortfolioDTO){			
		$http.defaults.headers.post['Content-Type'] = 'application/json';
		return	$http.post('./assignPortfolio', userPortfolioDTO);
	};
	
	return customerGroupPortfolioService;
	
}]).factory('customerGroupPortfolioFactory',function(){
	
	var _customerGroupPortfolioFactory = {};
	_customerGroupPortfolioFactory.userId = "";
	_customerGroupPortfolioFactory.userName = "";
	_customerGroupPortfolioFactory.portfolioId = "";
	_customerGroupPortfolioFactory.siteCode = "";
	_customerGroupPortfolioFactory.bsb = "";
	_customerGroupPortfolioFactory.managerId = "";
	return _customerGroupPortfolioFactory;
});
