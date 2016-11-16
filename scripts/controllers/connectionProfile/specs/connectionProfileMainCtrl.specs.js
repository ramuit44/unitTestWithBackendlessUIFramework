describe('Controller: connectionProfile.connectionProfileMainCtrl', function() {

    beforeEach(module('macAppTest'));


    var scope, connectionProfileFactory, Constants, location, custGroupDetailFactory, rootScope, customerGroupService, ModalService, filter, httpBackend, fetchMockDataService, deferred, routeParams;


    beforeEach(inject(function($controller, $rootScope, _Constants_, _$location_, _custGroupDetailFactory_, _customerGroupService_, _connectionProfileFactory_, _ModalService_, _$filter_, _fetchMockDataService_, $httpBackend, _$q_, _$routeParams_) {
        rootScope = $rootScope;
        fetchMockDataService = _fetchMockDataService_;
        scope = fetchMockDataService.getDefaultMockedScope(rootScope);
        connectionProfileFactory = _connectionProfileFactory_;
        Constants = _Constants_;
        location = _$location_;
        custGroupDetailFactory = _custGroupDetailFactory_;
        customerGroupService = _customerGroupService_;
        ModalService = _ModalService_;
        filter = _$filter_;
        httpBackend = $httpBackend;
        deferred = _$q_;
        routeParams = _$routeParams_;
        scope.showError = jasmine.createSpy('scope.showError');
        scope.removeScroller = jasmine.createSpy('scope.removeScroller');
        scope.connectionProfileFactory = connectionProfileFactory;
        $controller('connectionProfile.connectionProfileMainCtrl', {
            $scope: scope,
            Constants: _Constants_,
            connectionProfileFactory: _connectionProfileFactory_,
            customerGroupService: _customerGroupService_,
            $rootScope: $rootScope,
            ModalService: _ModalService_,
            $filter: _$filter_,
            custGroupDetailFactory: _custGroupDetailFactory_,
            location: _$location_,
            $q: _$q_,
            routeParams: _$routeParams_
        });

    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    

    it('test init - all success', function() {
    	spyOn(scope, 'getGroupOwnerDetails');
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'getCustGroupDetails');
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'getConnectionProfileMetrics');
        expect(scope.lendingDealsCount).toBe(0);
        expect(connectionProfileFactory.connection).toEqual({});
        scope.init();
        httpBackend.flush();
        expect(scope.connProfileTabIndex).toBe(Constants.connProfileTabIndex);
        expect(scope.selectedTabIndex).toBe(scope.connProfileTabIndex.FIN_INDX);
        expect(scope.connProfilePages).toBe(Constants.connProfilePages);
        expect(scope.connProfileTabs).toBe(Constants.connProfileTabs);
        expect(connectionProfileFactory.sourceGroupNo).toBe(routeParams.sourceGroupNo);
        expect(custGroupDetailFactory.custGroupId).toBe(routeParams.sourceGroupNo);
        expect(scope.connectionProfileFactory).toBe(connectionProfileFactory);
        expect(scope.lendingDealsCount).toBe(96);
        expect(connectionProfileFactory.connection).not.toBe(null);
        expect(scope.getGroupOwnerDetails).toHaveBeenCalled();
    });

    it('test init - getActiveAndMaturingCount error', function() {
    	spyOn(scope, 'getGroupOwnerDetails');
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'getCustGroupDetails');
        httpBackend.expectGET(/getConnectionProfileMetrics/).respond(500, {});
        expect(scope.lendingDealsCount).toBe(0);
        expect(connectionProfileFactory.connection).toEqual({});
        scope.init();
        httpBackend.flush();
        expect(scope.lendingDealsCount).toBe(0);
        expect(connectionProfileFactory.connection).toEqual({});
        expect(scope.showError).toHaveBeenCalled();
        expect(scope.getGroupOwnerDetails).not.toHaveBeenCalled();
    });

    it('test init - getMaturingFacilityCount error', function() {
    	spyOn(scope, 'getGroupOwnerDetails');
        httpBackend.expectPOST(/customerGrpDetails/).respond(500, {});
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'getConnectionProfileMetrics');
        expect(scope.lendingDealsCount).toBe(0);
        expect(connectionProfileFactory.connection).toEqual({});
        scope.init();
        httpBackend.flush();
        expect(scope.lendingDealsCount).toBe(0);
        expect(connectionProfileFactory.connection).toEqual({});
        expect(scope.showError).toHaveBeenCalled();
        expect(scope.getGroupOwnerDetails).not.toHaveBeenCalled();
    });

    it('test reLoadConnectionProfileMetrics', function() {
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'getConnectionProfileMetrics');
        scope.reLoadConnectionProfileMetrics();
        httpBackend.flush();
        expect(scope.lendingDealsCount).toBe(96);
    });

    it('test getMFacilityCount success', function() {
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'getMaturingFaciltiesCount');
        scope.getMFacilityCount();
        httpBackend.flush();
        expect(scope.maturingFacilitiesCount).toBe(5);
    });

    it('test getMFacilityCount error', function() {
        httpBackend.expectGET(/getMaturingFaciltiesCount/).respond(500, {});
        scope.getMFacilityCount();
        httpBackend.flush();
        expect(scope.maturingFacilitiesCount).toBe(0);
    });


    it('test selectTab', function() {
        scope.selectTab(3);
        expect(scope.selectedTabIndex).toBe(3);
    });

    it('test destroy event', function() {
        rootScope.$broadcast('$destroy');
        expect(scope.layoutManager.header).toBe(Constants.headerURL.DEFAULT_HEADER);
    });

    it('test loadTLAData with all success', function() {
        scope.childControllerHandler.createDonut = function() {};
        spyOn(scope, 'showSpinner');
        spyOn(scope, 'hideSpinner');
        spyOn(scope, 'getMFacilityCount');
        spyOn(scope.childControllerHandler, 'createDonut');
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'fetchTLAData');
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'getEquityForCustomerGroup');
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'getCurrentLimitForCustomerGroup');
        expect(rootScope.isTLADataLoaded).not.toBeTruthy();
        scope.loadTLAData();
        httpBackend.flush();
        expect(scope.showSpinner).toHaveBeenCalled();
        expect(rootScope.isTLADataLoaded).toBeTruthy();
        expect(scope.isCustomerTypeMissingError).toBeTruthy();
        expect(scope.hideSpinner).toHaveBeenCalled();
        expect(connectionProfileFactory.financials.availableEquity).toEqual({
            Commercial: 0,
            Residential: 0,
            Other: 4980000
        });
        expect(connectionProfileFactory.financials.tae.currentLimit).toEqual({
            1: 0,
            2: 4085020,
            3: 651515,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            AggregateExposure: 4916535,
            IPF: 50000,
            Other: 0,
            FX: 0,
            Personal: 0,
            "Consumer Lending": 651515,
            "Business Lending": 4085020,
            "Business Unsecured": 30000,
            "Equipment Finance": 100000,
            "businessTAE": 4265020,
            "consumerTAE": 651515
        });
        expect(connectionProfileFactory.financials.tae.calLimit).toEqual({
            BusinessCards: 0,
            UnsecuredOD: 0,
            BTLUnsecured: 0,
            BusinessTermLending: 0,
            Consumer: 0,
            IPFCancellable: 0,
            GxBonds: 0,
            "General Limit": 0,
            EFTeritary: 0,
            IPFNonCancellable: 0,
            EFPrimarySecondary: 0,
            SecuredOD: 0
        });
        expect(connectionProfileFactory.financials.tae.currentLimit.businessTAE).toBe(4265020);
        expect(connectionProfileFactory.financials.tae.currentLimit.consumerTAE).toEqual(651515);
        expect(scope.getMFacilityCount).toHaveBeenCalled();
        expect(scope.childControllerHandler.createDonut).toHaveBeenCalled();
    });


    it('test loadTLAData with TLA no error and loadEquity failed', function() {
        scope.childControllerHandler.createDonut = function() {};
        spyOn(scope, 'showSpinner');
        spyOn(scope, 'hideSpinner');
        spyOn(scope, 'getMFacilityCount');
        spyOn(scope.childControllerHandler, 'createDonut');
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'fetchTLAData');
        httpBackend.expectPOST(/getEquity/).respond(500, {});
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'getCurrentLimitForCustomerGroup');
        scope.loadTLAData();
        httpBackend.flush();
        expect(scope.customerId).toBe("");
        expect(scope.showError).toHaveBeenCalled();
        expect(connectionProfileFactory.financials).not.toBeUndefined();
    });

    it('test loadTLAData with TLA no error and loadCurrentLimit failed', function() {
        scope.childControllerHandler.createDonut = function() {};
        spyOn(scope, 'showSpinner');
        spyOn(scope, 'hideSpinner');
        spyOn(scope, 'getMFacilityCount');
        spyOn(scope.childControllerHandler, 'createDonut');
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'fetchTLAData');
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'getEquityForCustomerGroup');
        httpBackend.expectPOST(/getCurrentLimitForCustomerGroup/).respond(500, {});
        scope.loadTLAData();
        httpBackend.flush();
        expect(connectionProfileFactory.financials.tae).toBeUndefined();
        expect(scope.customerId).toBe("");
        expect(scope.showError).toHaveBeenCalled();
    });

    it('test loadTLAData with TLA error of type ESR CLEANSE REQUIRED ERROR', function() {
        spyOn(scope, 'showSpinner');
        spyOn(scope, 'hideSpinner');
        var response = deferred.defer();
        spyOn(ModalService, 'showESRCleanseModal').and.returnValue(response.promise);
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'fetchTLADataWithTLAErrorESRCleanse');
        scope.loadTLAData();
        httpBackend.flush();
        expect(scope.showSpinner).toHaveBeenCalled();
        expect(rootScope.isTLADataLoaded).not.toBeTruthy();
        expect(scope.isCustomerTypeMissingError).not.toBeTruthy();
        expect(scope.hideSpinner).toHaveBeenCalled();
        expect(scope.TLAErrorList.length).toBe(1);
        expect(ModalService.showESRCleanseModal).toHaveBeenCalled();
    });

    it('test loadTLAData with TLA error not of type ESR CLEANSE REQUIRED ERROR', function() {
        spyOn(scope, 'showSpinner');
        spyOn(scope, 'hideSpinner');
        var response = deferred.defer();
        spyOn(ModalService, 'showTLAErrorModal').and.returnValue(response.promise);
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'fetchTLADataWithTLAError');
        scope.loadTLAData();
        httpBackend.flush();
        expect(scope.showSpinner).toHaveBeenCalled();
        expect(rootScope.isTLADataLoaded).not.toBeTruthy();
        expect(scope.isCustomerTypeMissingError).toBeTruthy();
        expect(scope.hideSpinner).toHaveBeenCalled();
        expect(scope.TLAErrorList.length).toBe(1);
        expect(ModalService.showTLAErrorModal).toHaveBeenCalled();
    });

    it('test loadTLAData failure', function() {
        spyOn(scope, 'showSpinner');
        spyOn(scope, 'hideSpinner');
        httpBackend.expectPOST(/fetchTLAData/).respond(500, {});
        scope.loadTLAData();
        httpBackend.flush();
        expect(scope.TLAErrorList).toBeUndefined();
        expect(scope.showSpinner).toHaveBeenCalled();
        expect(scope.hideSpinner).toHaveBeenCalled();
    });

    it('test loadDealDetails success', function() {
        spyOn(scope, 'showSpinner');
        spyOn(scope, 'hideSpinner');
        spyOn(scope, 'loadDealPage');
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'buildDealForCustomerGroupSuccess');
        scope.loadDealDetails();
        httpBackend.flush();
        expect(scope.showSpinner).toHaveBeenCalled();
        expect(scope.hideSpinner).toHaveBeenCalled();
        expect(scope.loadDealPage).toHaveBeenCalledWith(1000016415);
    });

    it('test loadDealDetails with TLA Warning', function() {
        spyOn(scope, 'showSpinner');
        spyOn(scope, 'hideSpinner');
        spyOn(scope, 'loadDealPage');
        spyOn(scope, 'selectTab');
        var response = deferred.defer();
        spyOn(ModalService, 'showTLAAbortMessages').and.returnValue({
            result: response.promise
        });
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'buildDealForCustomerGroupFailedWithWarning');
        scope.loadDealDetails();
        httpBackend.flush();
        expect(scope.showSpinner).toHaveBeenCalled();
        expect(scope.isTLAabortErrorExists).not.toBeTruthy();
        expect(scope.selectTab).not.toHaveBeenCalled();
        expect(scope.hideSpinner).toHaveBeenCalled();
        expect(scope.removeScroller).toHaveBeenCalled();
        response.resolve({
            action: "start"
        });
        scope.$apply();
        expect(scope.loadDealPage).toHaveBeenCalled();
    });

    it('test loadDealDetails with TLA Abort error', function() {
        spyOn(scope, 'showSpinner');
        spyOn(scope, 'hideSpinner');
        spyOn(scope, 'loadDealPage');
        spyOn(scope, 'selectTab');
        var response = deferred.defer();
        spyOn(ModalService, 'showTLAAbortMessages').and.returnValue({
            result: response.promise
        });
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'buildDealForCustomerGroupFailedWithError');
        scope.loadDealDetails();
        httpBackend.flush();
        expect(scope.showSpinner).toHaveBeenCalled();
        expect(scope.isTLAabortErrorExists).toBeTruthy();
        expect(scope.isTLADataLoaded).not.toBeTruthy();
        expect(scope.selectTab).toHaveBeenCalled();
        expect(scope.hideSpinner).toHaveBeenCalled();
        expect(scope.removeScroller).toHaveBeenCalled();
        response.resolve({
            action: "start"
        });
        scope.$apply();
        expect(scope.loadDealPage).toHaveBeenCalled();
    });

    it('test loadDealDetails failed', function() {
        httpBackend.expectPOST(/buildDealForCustomerGroup/).respond(500, {});
        scope.loadDealDetails();
        httpBackend.flush();
        expect(rootScope.dealId).toBe('');
        expect(scope.error).toBeTruthy();
        expect(scope.showError).toHaveBeenCalled();
    });

    it('test loadDealPage ', function() {
        spyOn(location, 'path');
        scope.loadDealPage(12345);
        expect(rootScope.dealId).toBe(12345);
        expect(custGroupDetailFactory.searchedDealForCG.brokerId).toBe(null);
        expect(location.path).toHaveBeenCalled();
    });

    it('test getTLADataOrStartDeal isTLADataLoaded- true', function() {
        rootScope.isTLADataLoaded = true;
        spyOn(scope, 'loadDealDetails');
        spyOn(scope, 'loadTLAData');
        scope.getTLADataOrStartDeal();
        expect(scope.loadDealDetails).toHaveBeenCalled();
        expect(scope.loadTLAData).not.toHaveBeenCalled();
    });

    it('test getTLADataOrStartDeal isTLADataLoaded- false', function() {
        spyOn(scope, 'loadDealDetails');
        spyOn(scope, 'loadTLAData');
        rootScope.isTLADataLoaded = false;
        scope.getTLADataOrStartDeal();
        expect(scope.loadDealDetails).not.toHaveBeenCalled();
        expect(scope.loadTLAData).toHaveBeenCalled();       
    });
    
    it('test getGroupOwnerDetails isGroupOwnerExist', function() {      	
    	
    	connectionProfileFactory.connection = {groupOwner : {               
    			firstName: null,
    			lastName: null
    			}
            };       
        scope.groupOwner = null;
        scope.custGroupOwnerName = null;
        
        scope.getGroupOwnerDetails();        
    	expect(connectionProfileFactory.connection.groupOwner.firstName).toEqual(null);
    	expect(connectionProfileFactory.connection.groupOwner.lastName).toEqual(null);
    	expect(scope.custGroupOwnerName).toBe("Not Managed");
    	
    	
    	connectionProfileFactory.connection = {groupOwner : {            
			firstName: "abc",
			lastName: "xyz"
			}
        };       
	    scope.groupOwner = null;
	    scope.custGroupOwnerName = null;
	    
	    scope.getGroupOwnerDetails();	    
		expect(connectionProfileFactory.connection.groupOwner.firstName).toEqual("abc");
		expect(connectionProfileFactory.connection.groupOwner.lastName).toEqual("xyz");	
		expect(scope.custGroupOwnerName).toBe("abc xyz");
		
		
		connectionProfileFactory.connection = {groupOwner : {            
			firstName: null,
			lastName: "xyz"
			}
        };       
	    scope.groupOwner = null;
	    scope.firstName = null;
	    scope.custGroupOwnerName = null;
	    
	    scope.getGroupOwnerDetails();	    
		expect(connectionProfileFactory.connection.groupOwner.firstName).toEqual(null);
		expect(connectionProfileFactory.connection.groupOwner.lastName).toEqual("xyz");	
		expect(scope.custGroupOwnerName).toBe("xyz");
		
		
		connectionProfileFactory.connection = {groupOwner : {            
			firstName: "abc",
			lastName: null
			}
        };       
	    scope.groupOwner = null;
	    scope.custGroupOwnerName = null;
	    
	    scope.getGroupOwnerDetails();	    
		expect(connectionProfileFactory.connection.groupOwner.firstName).toEqual("abc");
		expect(connectionProfileFactory.connection.groupOwner.lastName).toEqual(null);	
		expect(scope.custGroupOwnerName).toBe("abc");
    	
    	
    	
    }); 
    
});