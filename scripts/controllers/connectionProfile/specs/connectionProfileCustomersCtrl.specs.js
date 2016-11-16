describe('Controller: connectionProfile.connectionProfileCustomersCtrl', function () {

  beforeEach(module('macAppTest'));

 
  var rootScope, scope, Constants, customerGroupService,customerService, ngTableParams, connectionProfileFactory, dealService, httpBackend, fetchMockDataService, ModalService, deferred;
  
  beforeEach(inject(function($controller,$rootScope,_Constants_,_customerGroupService_,_ngTableParams_,_connectionProfileFactory_,_dealService_,_fetchMockDataService_,$httpBackend,_$q_, _ModalService_,_customerService_){
  	rootScope = $rootScope;
    fetchMockDataService = _fetchMockDataService_;
    scope = fetchMockDataService.getDefaultMockedScope(rootScope);  
  	Constants = _Constants_;
    customerGroupService = _customerGroupService_;
    ngTableParams = _ngTableParams_;
    connectionProfileFactory = _connectionProfileFactory_;
  	dealService = _dealService_;
    httpBackend = $httpBackend;
    ModalService = _ModalService_;
    connectionProfileFactory.sourceGroupNo = "12345";
    connectionProfileFactory.connection.groupName = "mockName";
    deferred = _$q_;
    $controller('connectionProfile.connectionProfileCustomersCtrl', {
  		$scope: scope, 		 
  		Constants: _Constants_,
      customerGroupService:_customerGroupService_,
      ngTableParams : _ngTableParams_,
      connectionProfileFactory :_connectionProfileFactory_,
      dealService :_dealService_,
      ModalService : _ModalService_,
      deferred: _$q_,
      customerService : _customerService_
  	});
   
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

 
  it('test init()', function () {
     expect(scope.customerGroups).toBeUndefined();
     expect(scope.customerGroupsTableParams).toBeUndefined();
     scope.init();
     expect(scope.customerGroups).not.toBeUndefined();
     expect(scope.customerGroupsTableParams).not.toBeUndefined();
  });

  it('test getDataForCustomerGroupsTableParams() with empty customersList', function () {
    var tableGetData = deferred.defer();
    var params = {parameters:{}};
    var response = [{},{}];
    connectionProfileFactory.customersList = [];
    httpBackend.expectPOST(/customersForGrp/).respond(200, response);
    scope.getDataForCustomerGroupsTableParams(tableGetData, params);
    httpBackend.flush();
    expect(connectionProfileFactory.customersList.length).toBe(response.length);
    expect(params.parameters.count).toBe(2);
     
	});

  it('test getDataForCustomerGroupsTableParams() with non-empty customersList', function () {
    var tableGetData = deferred.defer();
    var params = {parameters:{}};
    connectionProfileFactory.customersList = [{},{}];
    scope.getDataForCustomerGroupsTableParams(tableGetData, params);
    tableGetData.promise.then(function(data){
      expect(data).toBe(connectionProfileFactory.customersList);
    });
  });

  it('test checkBlankField with invalid value', function () {
      var result = scope.checkBlankField();
      expect(result).toBe("");
  });

  it('test checkBlankField with valid value', function () {
      var result = scope.checkBlankField("I'm valid");
      expect(result).toBe("I'm valid");
  });

  it('test isAddressExist with invalid value', function () {
      var result = scope.isAddressExist();
      expect(result).not.toBeTruthy();
      scope.isAddressExist({});
      expect(result).not.toBeTruthy();
  });

  it('test isAddressExist with valid value', function () {
      var result = scope.isAddressExist({"postcode" : "12345"});
      expect(result).toBeTruthy(); 
  });

 

});