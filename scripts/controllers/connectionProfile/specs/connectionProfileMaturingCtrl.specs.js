describe('Controller: connectionProfile.connectionProfileMaturingCtrl', function() {

    beforeEach(module('macAppTest'));


    var rootScope, scope, Constants, customerGroupService, ngTableParams, connectionProfileFactory, dealService, httpBackend, fetchMockDataService, ModalService, deferred, connectionProfileModalService, custGroupFacilitiesFactory;

    beforeEach(inject(function($controller, $rootScope, _Constants_, _customerGroupService_, _ngTableParams_, _connectionProfileFactory_, _dealService_, _fetchMockDataService_, $httpBackend, _$q_, _ModalService_, _connectionProfileModalService_, _custGroupFacilitiesFactory_, _$compile_) {
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
        scope.productToBeExtended = {
            productId: 0
        };
        deferred = _$q_;
        connectionProfileModalService = _connectionProfileModalService_;
        custGroupFacilitiesFactory = _custGroupFacilitiesFactory_;
        scope.removeScroller = jasmine.createSpy('scope.removeScroller');
        scope.loadDealPage = jasmine.createSpy('scope.loadDealPage');
        $controller('connectionProfile.connectionProfileMaturingCtrl', {
            $scope: scope,
            Constants: _Constants_,
            customerGroupService: _customerGroupService_,
            ngTableParams: _ngTableParams_,
            connectionProfileFactory: _connectionProfileFactory_,
            dealService: _dealService_,
            ModalService: _ModalService_,
            deferred: _$q_,
            connectionProfileModalService: _connectionProfileModalService_,
            custGroupFacilitiesFactory:_custGroupFacilitiesFactory_
        });

    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });


    it('test init() with isMaturingFacilitiesLoaded false and call failure', function() {
        expect(connectionProfileFactory.isMaturingFacilitiesLoaded).not.toBeTruthy();
        expect(connectionProfileFactory.maturingFacilties.expired).toBeUndefined();
        expect(connectionProfileFactory.maturingFacilties.maturing).toBeUndefined();
        expect(scope.expiredFacilitiesTableParams).toBeUndefined();
        expect(scope.maturingFacilitiesTableParams).toBeUndefined();
        spyOn(scope, 'showSpinner');
        spyOn(scope, 'hideSpinner');
        httpBackend.expectGET(/getMaturingFacilities\?customerGrpId\=.*/).respond(500, {});
        scope.init();
        httpBackend.flush();
        expect(scope.showSpinner).toHaveBeenCalled();
        expect(scope.hideSpinner).toHaveBeenCalled();
        expect(connectionProfileFactory.isMaturingFacilitiesLoaded).not.toBeTruthy();
        expect(connectionProfileFactory.maturingFacilties.expired).toBeUndefined();
        expect(connectionProfileFactory.maturingFacilties.maturing).toBeUndefined();
        expect(scope.expiredFacilitiesTableParams).toBeUndefined();
        expect(scope.maturingFacilitiesTableParams).toBeUndefined();
    });

    it('test init() with isMaturingFacilitiesLoaded false and call success', function() {
        expect(connectionProfileFactory.isMaturingFacilitiesLoaded).not.toBeTruthy();
        expect(connectionProfileFactory.maturingFacilties.expired).toBeUndefined();
        expect(connectionProfileFactory.maturingFacilties.maturing).toBeUndefined();
        expect(scope.expiredFacilitiesTableParams).toBeUndefined();
        expect(scope.maturingFacilitiesTableParams).toBeUndefined();
        spyOn(scope, 'showSpinner');
        spyOn(scope, 'hideSpinner');
        fetchMockDataService.executeMockingForTests(httpBackend, 'connectionProfileService', 'getMaturingFacilities');
        scope.init();
        httpBackend.flush();
        expect(scope.showSpinner).toHaveBeenCalled();
        expect(scope.hideSpinner).toHaveBeenCalled();
        expect(connectionProfileFactory.maturingFacilties.expired.length).toBe(3);
        expect(connectionProfileFactory.maturingFacilties.maturing.length).toBe(2);
        expect(scope.expiredFacilitiesTableParams).not.toBeUndefined();
        expect(scope.maturingFacilitiesTableParams).not.toBeUndefined();
        expect(connectionProfileFactory.isMaturingFacilitiesLoaded).toBeTruthy();
    });

    it('test init() with isMaturingFacilitiesLoaded true', function() {
        connectionProfileFactory.isMaturingFacilitiesLoaded = true;
        connectionProfileFactory.maturingFacilties.expired = [];
        connectionProfileFactory.maturingFacilties.maturing = [];
        expect(scope.expiredFacilitiesTableParams).toBeUndefined();
        expect(scope.maturingFacilitiesTableParams).toBeUndefined();
        spyOn(scope, 'showSpinner');
        spyOn(scope, 'hideSpinner');
        scope.init();
        expect(scope.showSpinner).not.toHaveBeenCalled();
        expect(scope.hideSpinner).not.toHaveBeenCalled();
        expect(scope.expiredFacilitiesTableParams).not.toBeUndefined();
        expect(scope.maturingFacilitiesTableParams).not.toBeUndefined();
        expect(connectionProfileFactory.isMaturingFacilitiesLoaded).toBeTruthy();
    });

    it('test getMaturityDate with invalid value', function() {
        scope.getFormattedDate = jasmine.createSpy('scope.getFormattedDate');
        var result = scope.getMaturityDate(null);
        expect(scope.getFormattedDate).not.toHaveBeenCalled();
        expect(result).toBe(null);
    });

    it('test getMaturityDate with valid value', function() {
        scope.getFormattedDate = jasmine.createSpy('scope.getFormattedDate').and.returnValue("12/12/2009");
        var dateInMilliSec = 123456711;
        var datePassed = new Date(dateInMilliSec);
        var result = scope.getMaturityDate(dateInMilliSec);
        expect(scope.getFormattedDate).toHaveBeenCalledWith(datePassed);
        expect(result).toBe("12/12/2009");
    });

    it('test onExtendButtonMouseOver', function() {
        var buttonElement = jasmine.createSpy();
        buttonElement.parent = jasmine.createSpy();
        var buttonWrapper = jasmine.createSpy();
        buttonWrapper.find = jasmine.createSpy();
        var infoElement = jasmine.createSpy();
        infoElement.popover = jasmine.createSpy();
        var event = jasmine.createSpy();
        event.currentTarget = buttonElement;
        var angularElementSpy = spyOn(angular, 'element').and.callFake(function(selector){return selector;});
        buttonWrapper.find.and.returnValue(infoElement);
        buttonElement.parent.and.returnValue(buttonWrapper);
        scope.onExtendButtonMouseOver(event);
        angularElementSpy.and.callThrough();
        expect(angular.element).toHaveBeenCalledWith(buttonElement);
        expect(buttonElement.parent).toHaveBeenCalled();
        expect(buttonWrapper.find).toHaveBeenCalledWith("i");
        expect(infoElement.popover).toHaveBeenCalledWith("show");
    });


    it('test onExtendButtonMouseOut', function() {
        var buttonElement = jasmine.createSpy();
        buttonElement.parent = jasmine.createSpy();
        var buttonWrapper = jasmine.createSpy();
        buttonWrapper.find = jasmine.createSpy();
        var infoElement = jasmine.createSpy();
        infoElement.popover = jasmine.createSpy();
        var event = jasmine.createSpy();
        event.currentTarget = buttonElement;
        var angularElementSpy = spyOn(angular, 'element').and.callFake(function(selector){return selector;});
        buttonWrapper.find.and.returnValue(infoElement);
        buttonElement.parent.and.returnValue(buttonWrapper);
        scope.onExtendButtonMouseOut(event);
        angularElementSpy.and.callThrough();
        expect(angular.element).toHaveBeenCalledWith(buttonElement);
        expect(buttonElement.parent).toHaveBeenCalled();
        expect(buttonWrapper.find).toHaveBeenCalledWith("i");
        expect(infoElement.popover).toHaveBeenCalledWith("hide");
    });

    it('test extendFacility with all success', function() {
        spyOn(scope, 'showSpinner');
        var getConnectionHealthCheckAsync = deferred.defer();
        var responseAsync = deferred.defer();
        var response = responseAsync.promise;
        spyOn(scope, 'getConnectionHealthCheck').and.returnValue(response);
        spyOn(scope, 'shouldEnableFastTrackCheck').and.returnValue(response);
        spyOn(scope, 'checkEligibilityForFastTrack').and.returnValue(response);
        spyOn(scope, 'checkApprovalCheckListEligibility').and.returnValue(response);
        scope.extendFacility();
        responseAsync.resolve(true);
        scope.$apply();
        expect(scope.showSpinner).toHaveBeenCalled();
        expect(scope.getConnectionHealthCheck).toHaveBeenCalled();
        expect(scope.shouldEnableFastTrackCheck).toHaveBeenCalled();
        expect(scope.checkEligibilityForFastTrack).toHaveBeenCalled();
        expect(scope.checkApprovalCheckListEligibility).toHaveBeenCalled();
    });

    it('test getConnectionHealthCheck', function() {
        var responseAsync = deferred.defer();
        var response = responseAsync.promise;
        spyOn(customerGroupService, 'checkConnectionHealth').and.returnValue(response);
        var connectionHealthCheck = scope.getConnectionHealthCheck(connectionProfileFactory);
        responseAsync.resolve({
            data: {
                resultObject: "healthCheckData"
            }
        });
        scope.$apply();
        connectionHealthCheck.then(function(data) {
            expect(data).toBe("healthCheckData");
        })
    });

    it('test shouldEnableFastTrackCheck without abort list', function() {
        var shouldEnableFastTrackCheck = scope.shouldEnableFastTrackCheck({
            abortList: null
        });
        expect(shouldEnableFastTrackCheck).toBeTruthy();
    });

    it('test shouldEnableFastTrackCheck with invalid abort list', function() {
        var shouldEnableFastTrackCheck = scope.shouldEnableFastTrackCheck({
            abortList: {}
        });
        expect(shouldEnableFastTrackCheck).toBeTruthy();
    });

    it('test shouldEnableFastTrackCheck with valid abort list - error - ok click', function() {
        var abortList = [{
            "code": 10025,
            "type": "Abort",
            "message": "ACN for the Customer is missing",
            "resource": "TYG PVT LTDS CLUBS",
            "subMessage": null
        }];
        var tlaModal = deferred.defer();
        spyOn(ModalService, 'showTLAAbortMessages').and.returnValue({
            result: tlaModal.promise
        });
        var shouldEnableFastTrackCheck = scope.shouldEnableFastTrackCheck({
            abortList: abortList,
            errorCount: 1
        });
        expect(ModalService.showTLAAbortMessages).toHaveBeenCalledWith(jasmine.any(Object), true, "12345", false);
        tlaModal.resolve({
            action: 'ok'
        });
        scope.$apply();
        shouldEnableFastTrackCheck.then(function(data) {
            expect(data).toBeUndefined();
        })
    });

    it('test shouldEnableFastTrackCheck with valid abort list - error - close click', function() {
        var abortList = [{
            "code": 10025,
            "type": "Abort",
            "message": "ACN for the Customer is missing",
            "resource": "TYG PVT LTDS CLUBS",
            "subMessage": null
        }];
        var tlaModal = deferred.defer();
        spyOn(ModalService, 'showTLAAbortMessages').and.returnValue({
            result: tlaModal.promise
        });
        var shouldEnableFastTrackCheck = scope.shouldEnableFastTrackCheck({
            abortList: abortList,
            errorCount: 1
        });
        expect(ModalService.showTLAAbortMessages).toHaveBeenCalledWith(jasmine.any(Object), true, "12345", false);
        tlaModal.reject({
            action: 'close'
        });
        scope.$apply();
        shouldEnableFastTrackCheck.then(function(data) {
            expect(data).not.toBeUndefined();
            expect(data).not.toBeTruthy();
        })
    });

    it('test shouldEnableFastTrackCheck with valid abort list - warning - start click', function() {
        var abortList = [{
            "code": 10025,
            "type": "Abort",
            "message": "ACN for the Customer is missing",
            "resource": "TYG PVT LTDS CLUBS",
            "subMessage": null
        }];
        var tlaModal = deferred.defer();
        spyOn(ModalService, 'showTLAAbortMessages').and.returnValue({
            result: tlaModal.promise
        });
        var shouldEnableFastTrackCheck = scope.shouldEnableFastTrackCheck({
            abortList: abortList,
            errorCount: 0
        });
        expect(ModalService.showTLAAbortMessages).toHaveBeenCalledWith(jasmine.any(Object), false, "12345", false);
        tlaModal.resolve({
            action: 'start'
        });
        scope.$apply();
        shouldEnableFastTrackCheck.then(function(data) {
            expect(data).toBeTruthy();
        })
    });

    it('test checkEligibilityForFastTrack with shouldEnableFastTrackCheck as false', function() {
        spyOn(scope, 'hideSpinner');
        scope.checkEligibilityForFastTrack(false);
        expect(scope.hideSpinner).toHaveBeenCalled();
    });

    it('test checkEligibilityForFastTrack with shouldEnableFastTrackCheck as true - no errors on eligibility check - next clicked', function() {
        spyOn(scope, 'hideSpinner');
        spyOn(scope, 'showSpinner');
        
        var rollOverFTEligibilityCheck = deferred.defer();
        var showMaturingFacilitiesFTApprovalCheckList = deferred.defer();
        var rollOverApprovalChecklistEligibilityCheck = deferred.defer();
        var approvalCheckListEligibilityResult = "approvalCheckListEligibilityResult";
        spyOn(customerGroupService, 'rollOverFTEligibilityCheck').and.returnValue(rollOverFTEligibilityCheck.promise);
        spyOn(connectionProfileModalService, 'showMaturingFacilitiesFTApprovalCheckList').and.returnValue({
            result: showMaturingFacilitiesFTApprovalCheckList.promise
        });
        spyOn(customerGroupService, 'rollOverApprovalChecklistEligibilityCheck').and.returnValue(rollOverApprovalChecklistEligibilityCheck.promise);
        var checkEligibilityForFastTrack = scope.checkEligibilityForFastTrack(true);
        var approvalCheckList = [];
        rollOverFTEligibilityCheck.resolve({
            data: {
                resultObject: {
                    approvalCheckList: approvalCheckList
                }
            }
        });
        scope.$apply();
        expect(scope.hideSpinner).toHaveBeenCalled();
        expect(scope.rolloverFacilitiesDTO.approvalCheckList).toBe(approvalCheckList);
        expect(scope.productToBeExtended.sourceGroupNo).toBe(connectionProfileFactory.sourceGroupNo);
        expect(scope.rolloverFacilitiesDTO.productDto).toBe(scope.productToBeExtended);
        expect(scope.removeScroller).toHaveBeenCalled();
        showMaturingFacilitiesFTApprovalCheckList.resolve("next");
        scope.$apply();
        expect(scope.showSpinner).toHaveBeenCalled();
        rollOverApprovalChecklistEligibilityCheck.resolve(approvalCheckListEligibilityResult);
        checkEligibilityForFastTrack.then(function(data) {
            expect(data).toBe(approvalCheckListEligibilityResult);
        })
        scope.$apply();
    });

    it('test checkEligibilityForFastTrack with shouldEnableFastTrackCheck as true - no errors on eligibility check - close clicked', function() {
        spyOn(scope, 'hideSpinner');
        spyOn(scope, 'showSpinner');
        var rollOverFTEligibilityCheck = deferred.defer();
        var showMaturingFacilitiesFTApprovalCheckList = deferred.defer();
        var rollOverApprovalChecklistEligibilityCheck = deferred.defer();
        spyOn(customerGroupService, 'rollOverFTEligibilityCheck').and.returnValue(rollOverFTEligibilityCheck.promise);
        spyOn(connectionProfileModalService, 'showMaturingFacilitiesFTApprovalCheckList').and.returnValue({
            result: showMaturingFacilitiesFTApprovalCheckList.promise
        });
        spyOn(customerGroupService, 'rollOverApprovalChecklistEligibilityCheck').and.returnValue(rollOverApprovalChecklistEligibilityCheck.promise);
        var checkEligibilityForFastTrack = scope.checkEligibilityForFastTrack(true);
        var approvalCheckList = [];
        rollOverFTEligibilityCheck.resolve({
            data: {
                resultObject: {
                    approvalCheckList: approvalCheckList
                }
            }
        });
        scope.$apply();
        expect(scope.hideSpinner).toHaveBeenCalled();
        expect(scope.rolloverFacilitiesDTO.approvalCheckList).toBe(approvalCheckList);
        expect(scope.productToBeExtended.sourceGroupNo).toBe(connectionProfileFactory.sourceGroupNo);
        expect(scope.rolloverFacilitiesDTO.productDto).toBe(scope.productToBeExtended);
        expect(scope.removeScroller).toHaveBeenCalled();
        showMaturingFacilitiesFTApprovalCheckList.reject("close");
        scope.$apply();
        expect(scope.hideSpinner).toHaveBeenCalled();
        checkEligibilityForFastTrack.then(function(data) {
            expect(data).not.toBeTruthy();
        })
        scope.$apply();
    });

    it('test checkEligibilityForFastTrack with shouldEnableFastTrackCheck as true - error with PRODUCT_NOT_ELIGIBILE_FAST_TRACK_ERR_CODE', function() {
        spyOn(scope, 'hideSpinner');
        spyOn(scope, 'showSpinner');
        spyOn(scope, 'loadDealPageAndExtend');
        var rollOverFTEligibilityCheck = deferred.defer();
        spyOn(customerGroupService, 'rollOverFTEligibilityCheck').and.returnValue(rollOverFTEligibilityCheck.promise);
        var checkEligibilityForFastTrack = scope.checkEligibilityForFastTrack(true);
        rollOverFTEligibilityCheck.resolve({
            data: {
                resultObject: {
                    dealId: 12345
                },
                errorList: [{
                    code: Constants.commonErrorCodes.PRODUCT_NOT_ELIGIBILE_FAST_TRACK_ERR_CODE
                }]
            }
        });
        scope.$apply();
        expect(scope.hideSpinner).not.toHaveBeenCalled();
        expect(scope.loadDealPageAndExtend).toHaveBeenCalledWith(12345);
    });

    it('test checkEligibilityForFastTrack with shouldEnableFastTrackCheck as true - error otherthan PRODUCT_NOT_ELIGIBILE_FAST_TRACK_ERR_CODE', function() {
        spyOn(scope, 'hideSpinner');
        spyOn(scope, 'showSpinner');
        var rollOverFTEligibilityCheck = deferred.defer();
        spyOn(customerGroupService, 'rollOverFTEligibilityCheck').and.returnValue(rollOverFTEligibilityCheck.promise);
        var checkEligibilityForFastTrack = scope.checkEligibilityForFastTrack(true);
        rollOverFTEligibilityCheck.resolve({
            data: {
                resultObject: {
                    dealId: 12345
                },
                errorList: [{
                    code: 5000
                }]
            }
        });
        scope.$apply();
        expect(scope.loadDealPage).not.toHaveBeenCalled();
        expect(scope.hideSpinner).toHaveBeenCalled();
    });

    it('test checkApprovalCheckListEligibility with approvalCheckListEligibilityResult success', function() {
        spyOn(connectionProfileModalService, 'showMaturingFacilitiesFTRollOverDetails');
        spyOn(scope, 'hideSpinner');
        var productDto = {
            dealId: 1
        };
        var checkEligibilityForFastTrack = scope.checkApprovalCheckListEligibility({
            data: {
                resultObject: {
                    productDto: productDto
                }
            }
        });
        expect(scope.rolloverFacilitiesDTO.productDto).toBe(productDto);
        expect(connectionProfileModalService.showMaturingFacilitiesFTRollOverDetails).toHaveBeenCalledWith(scope.rolloverFacilitiesDTO, scope, false);
        expect(scope.hideSpinner).toHaveBeenCalled();

    });

    it('test checkApprovalCheckListEligibility with approvalCheckListEligibilityResult error with ROLLOVER_APPROVAL_CHECKLIST_ELIGIBILITY_FAILURE', function() {
        spyOn(scope, 'loadDealPageAndExtend');
        var checkEligibilityForFastTrack = scope.checkApprovalCheckListEligibility({
            data: {
                resultObject: {
                    dealId: 12345
                },
                errorList: [{
                    code: Constants.commonErrorCodes.ROLLOVER_APPROVAL_CHECKLIST_ELIGIBILITY_FAILURE
                }]
            }
        });
        expect(scope.loadDealPageAndExtend).toHaveBeenCalledWith(12345);
    });

    it('test checkApprovalCheckListEligibility with approvalCheckListEligibilityResult error other than ROLLOVER_APPROVAL_CHECKLIST_ELIGIBILITY_FAILURE', function() {
        spyOn(scope, 'loadDealPageAndExtend');
        var checkEligibilityForFastTrack = scope.checkApprovalCheckListEligibility({
            data: {
                resultObject: {
                    dealId: 12345
                },
                errorList: [{
                    code: 12222
                }]
            }
        });
        expect(scope.loadDealPageAndExtend).not.toHaveBeenCalled();
    });

    it('test loadDealPageAndExtend ', function() {
        scope.loadDealPageAndExtend(12345);
        expect(custGroupFacilitiesFactory.productToBeExtended).toBe(scope.productToBeExtended);
        expect(scope.loadDealPage).toHaveBeenCalledWith(12345);
    });

});