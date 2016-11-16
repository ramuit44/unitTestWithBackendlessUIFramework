describe('Controller: connectionProfile.connectionProfileFinancialsCtrl', function () {

  beforeEach(module('macAppTest'));

 
  var rootScope, scope, Constants, customerGroupService, connectionProfileFactory, httpBackend, window, filter, timeout;
  
  beforeEach(inject(function($controller,$rootScope,_Constants_,_customerGroupService_,_connectionProfileFactory_,_fetchMockDataService_,$httpBackend,_$q_,_$window_,_$filter_,_$timeout_){
  	rootScope = $rootScope;
    fetchMockDataService = _fetchMockDataService_;
    scope = fetchMockDataService.getDefaultMockedScope(rootScope);  
  	Constants = _Constants_;
    customerGroupService = _customerGroupService_;
    connectionProfileFactory = _connectionProfileFactory_;
  	httpBackend = $httpBackend;
    window = _$window_;
    filter = _$filter_;
    timeout = _$timeout_;

    connectionProfileFactory.sourceGroupNo = "12345";
    connectionProfileFactory.connection.groupName = "mockName";
    scope.childControllerHandler = {};
    scope.childControllerHandler.createDonut = function() {};
    $controller('connectionProfile.connectionProfileFinancialsCtrl', {
  		$scope: scope, 		 
  		Constants: _Constants_,
      connectionProfileFactory :_connectionProfileFactory_,
      $rootScope: rootScope,
      $window: _$window_,
      $filter: _$filter_,
      $timeout: _$timeout_,
      customerGroupService:_customerGroupService_
  	});
   
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

 
  it('call init',function(){
    expect(connectionProfileFactory.financials.limits).toBeUndefined();
    scope.user={beltLevel:5};
    spyOn(scope,'showSpinner');
    spyOn(scope,'hideSpinner');
    spyOn(scope.childControllerHandler,'createDonut');
    fetchMockDataService.executeMockingForTests(httpBackend,'staticDataService','getAllBeltLevels');
    fetchMockDataService.executeMockingForTests(httpBackend,'customerGroupService','getCustomerGroupLimits');
    scope.init();
    httpBackend.flush();
    expect(scope.showSpinner).toHaveBeenCalled();
    expect(scope.hideSpinner).toHaveBeenCalled();
    expect(scope.childControllerHandler.createDonut).toHaveBeenCalled();
    expect(connectionProfileFactory.financials.limits).not.toBeUndefined();
    expect(connectionProfileFactory.financials.limits.conditionalBusinessTermLending).toBe(300000);

  });
  
  /*it('create Donut',function(){
    rootScope.isTLADataLoaded = false;
    fetchMockDataService.executeMockingForTests(httpBackend,'customerGroupService','getCustomerGroupLimits');
    scope.init();
    httpBackend.flush();  
    console.log("In it: "+scope.chartTotal);                
    expect(scope.chartTotal).not.toBeUndefined();
    expect(scope.chartColors).not.toBeUndefined();
  });*/

});