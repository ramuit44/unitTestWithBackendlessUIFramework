describe('Controller: connectionProfile.connectionProfileDealsCtrl', function () {

  beforeEach(module('macAppTest'));

 
  var rootScope, scope, Constants, customerGroupService, ngTableParams, connectionProfileFactory, dealService, httpBackend, fetchMockDataService, deferred;
  
  beforeEach(inject(function($controller,$rootScope,_Constants_,_customerGroupService_,_ngTableParams_,_connectionProfileFactory_,_dealService_,_fetchMockDataService_,$httpBackend,_$q_){
  	rootScope = $rootScope;
    fetchMockDataService = _fetchMockDataService_;
    scope = fetchMockDataService.getDefaultMockedScope(rootScope);  
  	Constants = _Constants_;
    customerGroupService = _customerGroupService_;
    ngTableParams = _ngTableParams_;
    connectionProfileFactory = _connectionProfileFactory_;
  	dealService = _dealService_;
    httpBackend = $httpBackend;
    deferred = _$q_;
    connectionProfileFactory.sourceGroupNo = "12345";
    connectionProfileFactory.connection.groupName = "mockName";

    $controller('connectionProfile.connectionProfileDealsCtrl', {
  		$scope: scope, 		 
  		Constants: _Constants_,
      customerGroupService:_customerGroupService_,
      ngTableParams : _ngTableParams_,
      connectionProfileFactory :_connectionProfileFactory_,
      dealService :_dealService_,
      deferred: _$q_
  	});
   
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

 
  it('load deals with isDealsLoaded false and call failure', function () {
      expect(connectionProfileFactory.isDealsLoaded).not.toBeTruthy();
      expect(connectionProfileFactory.lendingDeals.activeDeals).toBeUndefined();
      expect(connectionProfileFactory.lendingDeals.submittedDeals).toBeUndefined();
      expect(scope.submittedDealTableParams).toBeUndefined();
      expect(scope.activeDealTableParams).toBeUndefined();
      spyOn(scope, 'showSpinner');
      spyOn(scope, 'hideSpinner');
      httpBackend.expectGET(/dealsForCustomerGroup1\?customerGrpId\=.*\&dealStatusSearchStr\=9,10,12,14/).respond(500,{});
      httpBackend.expectGET(/dealsForCustomerGroup1\?customerGrpId\=.*\&dealStatusSearchStr\=13,15/).respond(500,{});
      scope.init();
      httpBackend.flush();
      expect(scope.showSpinner).toHaveBeenCalled();
      expect(scope.hideSpinner).toHaveBeenCalled();
      expect(connectionProfileFactory.isDealsLoaded).not.toBeTruthy();
      expect(connectionProfileFactory.lendingDeals.activeDeals).toBeUndefined();
      expect(connectionProfileFactory.lendingDeals.submittedDeals).toBeUndefined();
      expect(scope.submittedDealTableParams).toBeUndefined();
      expect(scope.activeDealTableParams).toBeUndefined();
  });

  it('load deals with isDealsLoaded false and call success', function () {
	    expect(connectionProfileFactory.isDealsLoaded).not.toBeTruthy();
      expect(connectionProfileFactory.lendingDeals.activeDeals).toBeUndefined();
      expect(connectionProfileFactory.lendingDeals.submittedDeals).toBeUndefined();
      expect(scope.submittedDealTableParams).toBeUndefined();
      expect(scope.activeDealTableParams).toBeUndefined();
      spyOn(scope, 'showSpinner');
      spyOn(scope, 'hideSpinner');
      fetchMockDataService.executeMockingForTests(httpBackend,'connectionProfileService','getActiveLendingDeals');
      fetchMockDataService.executeMockingForTests(httpBackend,'connectionProfileService','getSubmittedLendingDeals');
      scope.init();
      httpBackend.flush();
      expect(scope.showSpinner).toHaveBeenCalled();
      expect(scope.hideSpinner).toHaveBeenCalled();
      expect(connectionProfileFactory.lendingDeals.activeDeals.length).toBe(20);
      expect(connectionProfileFactory.lendingDeals.submittedDeals.length).toBe(33);
      expect(scope.submittedDealTableParams).not.toBeUndefined();
      expect(scope.activeDealTableParams).not.toBeUndefined();
      expect(connectionProfileFactory.isDealsLoaded).toBeTruthy();
	});

  it('load deals with isDealsLoaded true', function () {
      connectionProfileFactory.isDealsLoaded = true;
      connectionProfileFactory.lendingDeals.activeDeals = [];
      connectionProfileFactory.lendingDeals.submittedDeals = [];
      expect(scope.submittedDealTableParams).toBeUndefined();
      expect(scope.activeDealTableParams).toBeUndefined();
      spyOn(scope, 'showSpinner');
      spyOn(scope, 'hideSpinner');
      scope.init();
      expect(scope.showSpinner).not.toHaveBeenCalled();
      expect(scope.hideSpinner).not.toHaveBeenCalled();
      expect(scope.submittedDealTableParams).not.toBeUndefined();
      expect(scope.activeDealTableParams).not.toBeUndefined();
      expect(connectionProfileFactory.isDealsLoaded).toBeTruthy();
  });

  it('call redirectDeal', function () {
      var deal = {};
      spyOn(dealService, 'redirectDeal').and.returnValue(true);
      scope.redirectDeal(deal);
      expect(deal.sourceGroupNo).toBe("12345");
      expect(deal.customerGroupName).toBe("mockName");
      expect(dealService.redirectDeal).toHaveBeenCalledWith(deal, scope);
  });

  it('call redirectDealBasedOnStatus', function () {
      var deal = {};
      spyOn(dealService, 'redirectDealBasedOnStatus').and.returnValue(true);;
      scope.redirectDealBasedOnStatus(deal);
      expect(deal.sourceGroupNo).toBe("12345");
      expect(deal.customerGroupName).toBe("mockName");
      expect(dealService.redirectDealBasedOnStatus).toHaveBeenCalledWith(deal, scope.user, scope);
  });

  it('call isDealsubmittedToTLA', function () {
      var status = 12;
      spyOn(dealService, 'isDealsubmittedToTLA').and.returnValue(true);;
      scope.isDealsubmittedToTLA(status);
      expect(dealService.isDealsubmittedToTLA).toHaveBeenCalledWith(status);
  });

  it('test getOnHoverContentString for non EXPIRED deal', function () {
      var currentRow = {"dealStatus" : Constants.dealStatus.FINALISE, "productRefreshedDate" : "12/12/2009"};
      var result = scope.getOnHoverContentString(currentRow);
      expect(result).toBe('Click to view the TLA status of your deal.');
  });

  it('test getOnHoverContentString for EXPIRED deal', function () {
      var currentRow = {"dealStatus" : Constants.dealStatus.EXPIRED, "productRefreshedDate" : "12/12/2009"};
      var result = scope.getOnHoverContentString(currentRow);
      expect(result).toBe('The deal has expired as the last product refresh date was on 12/12/2009 which exceeds the limit of 18 days. To submit, start a new deal.');
      currentRow = {"dealStatus" : Constants.dealStatus.EXPIRED, "productRefreshedDate" : ""};
      result = scope.getOnHoverContentString(currentRow);
      expect(result).toBe('The deal has expired. To submit, start a new deal.');
  });

  it('test getDecisionStatus for EXPIRED deal with no decision', function () {
      var currentRow = {"dealStatus" : Constants.dealStatus.EXPIRED, "decisionStatus" : "No Decision"};
      var result = scope.getDecisionStatus(currentRow);
      expect(result).toBe('-');

  });

  it('test getDecisionStatus for EXPIRED deal with decision', function () {
      var currentRow = {"dealStatus" : Constants.dealStatus.EXPIRED, "decisionStatus" : "Customers Required"};
      var result = scope.getDecisionStatus(currentRow);
      expect(result).toBe('Customers Required');
  });

  it('test delete Deal', function () {
      var deleteDealCall = deferred.defer();
      var deal = {"dealId" : "12345"};
      connectionProfileFactory.isDealsLoaded = true;
      scope.reLoadConnectionProfileMetrics = function(){};
      spyOn(customerGroupService, 'deleteDeal').and.returnValue(deleteDealCall.promise);
      spyOn(scope, 'reLoadConnectionProfileMetrics');
      spyOn(scope, 'init');
      scope.deleteDeal(deal);
      deleteDealCall.resolve({});
      rootScope.$apply();
      expect(connectionProfileFactory.isDealsLoaded).not.toBeTruthy();
      expect(scope.reLoadConnectionProfileMetrics).toHaveBeenCalled();
      expect(scope.init).toHaveBeenCalled();
  });
  
});