describe('Service: dealService', function() {


    beforeEach(module('macAppTest'));

    var rootScope, dealService, httpBackend, customerGroupService, custGroupDetailFactory, decisionDetailsFactory, Constants, fetchMockDataService, modalService, location, deferred, connectionProfileModalService, scope;

    beforeEach(inject(function($rootScope, _dealService_, $httpBackend, _Constants_, _custGroupDetailFactory_, _decisionDetailsFactory_, _fetchMockDataService_, _ModalService_, _$location_, $q, _connectionProfileModalService_) {
        rootScope = $rootScope;
        dealService = _dealService_;
        httpBackend = $httpBackend;
        custGroupDetailFactory = _custGroupDetailFactory_;
        Constants = _Constants_;
        fetchMockDataService = _fetchMockDataService_;
        decisionDetailsFactory = _decisionDetailsFactory_;
        modalService = _ModalService_;
        location = _$location_;
        deferred = $q;
        connectionProfileModalService = _connectionProfileModalService_;
        scope = {
            showSpinner: jasmine.createSpy("scope.showSpinner"),
            hideSpinner: jasmine.createSpy("scope.hideSpinner"),
            getDecision: function(dealID) {
                return dealService.getDealDecisionDetails(dealID);
            }
        };
    }));


    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('call redirectDeal with fastTrackRollover = true and deal submitted to TLA', function() {
        var deal = { id: 1, sourceGroupNo: 12345, dealStatus: Constants.dealStatus.FINALISE, sourceGroupNoDeleted: true, fastTrackRollover: true };
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'getRolloverFacilityDetailsOfMaturingFacilityFTDeal');
        spyOn(dealService, 'dealRedirectOuter').and.returnValue("");
        spyOn(dealService, 'getDealStatusFromDealStatusId');
        spyOn(dealService, 'isDealsubmittedToTLA').and.returnValue(true);
        spyOn(connectionProfileModalService, 'showMaturingFacilitiesFTRollOverDetails');
        dealService.redirectDeal(deal, scope);
        expect(dealService.getDealStatusFromDealStatusId).not.toHaveBeenCalled();
        expect(scope.showSpinner).toHaveBeenCalled();
        expect(dealService.isDealsubmittedToTLA).toHaveBeenCalled();
        httpBackend.flush();
        expect(connectionProfileModalService.showMaturingFacilitiesFTRollOverDetails).toHaveBeenCalledWith(jasmine.any(Object), scope, true);
        expect(scope.hideSpinner).toHaveBeenCalled();
    });

    it('call redirectDeal with fastTrackRollover = true and deal not submitted to TLA', function() {
        var deal = { id: 1, sourceGroupNo: 12345, dealStatus: Constants.dealStatus.FINALISE, sourceGroupNoDeleted: true, fastTrackRollover: true },
            config = { isDealsubmittedToTLA: false };
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'getRolloverFacilityDetailsOfMaturingFacilityFTDeal');
        spyOn(dealService, 'dealRedirectOuter').and.returnValue("");
        spyOn(dealService, 'getDealStatusFromDealStatusId');
        spyOn(dealService, 'isDealsubmittedToTLA').and.returnValue(true);
        spyOn(connectionProfileModalService, 'showMaturingFacilitiesFTRollOverDetails');
        dealService.redirectDeal(deal, scope, config);
        expect(dealService.getDealStatusFromDealStatusId).not.toHaveBeenCalled();
        expect(scope.showSpinner).toHaveBeenCalled();
        expect(dealService.isDealsubmittedToTLA).not.toHaveBeenCalled();
        httpBackend.flush();
        expect(connectionProfileModalService.showMaturingFacilitiesFTRollOverDetails).toHaveBeenCalledWith(jasmine.any(Object), scope, false);
        expect(scope.hideSpinner).toHaveBeenCalled();
    });

    it('call redirectDeal with fastTrackRollover = false', function() {
        var deal = { id: 1, sourceGroupNo: 12345, dealStatusId: 9, sourceGroupNoDeleted: true },
            config = {};
        fetchMockDataService.executeMockingForTests(httpBackend, 'customerGroupService', 'getCustGroupDetails');
        spyOn(dealService, 'dealRedirectOuter').and.returnValue("");
        dealService.redirectDeal(deal, scope, config);
        httpBackend.flush();
        expect(custGroupDetailFactory.customerGroup).not.toBeUndefined();
        expect(dealService.dealRedirectOuter).toHaveBeenCalledWith(deal.id, deal.sourceGroupNo, deal.dealStatus, deal.sourceGroupNoDeleted, scope, undefined, config, false);
        expect(custGroupDetailFactory.searchedDealForCG).toBe(deal);
    });

    it('call dealRedirectOuter with sourceGroupNoDeleted = false and deal status expired & dealStatusBeforeExpiry not in (ready to submit or finalize deal)', function() {
        var deal = { id: 1, sourceGroupNo: 12345, dealStatus: Constants.dealStatus.EXPIRED, sourceGroupNoDeleted: false };
        spyOn(location, 'path');
        dealService.dealRedirectOuter(deal.id, deal.sourceGroupNo, deal.dealStatus, deal.sourceGroupNoDeleted, scope, Constants.dealStatusCode.SUBMIT);
        expect(rootScope.dealId).toBe(deal.id);
        expect(custGroupDetailFactory.custGroupId).toBe(deal.sourceGroupNo);
        expect(location.path).toHaveBeenCalledWith("/dealPage");
    });

    it('call dealRedirectOuter with sourceGroupNoDeleted = false and deal status expired & dealStatusBeforeExpiry = ready to submit or finalize deal', function() {
        var deal = { id: 1, sourceGroupNo: 12345, dealStatus: Constants.dealStatus.EXPIRED, sourceGroupNoDeleted: false },
            response = { resultObject: { dealStatusCode: 15 } },
            config = {};
        spyOn(location, 'path');
        httpBackend.expectPOST(/getDealDecisionDetails/).respond(200, response);
        dealService.dealRedirectOuter(deal.id, deal.sourceGroupNo, deal.dealStatus, deal.sourceGroupNoDeleted, scope, Constants.dealStatusCode.FINALIZE_DEAL);
        httpBackend.flush();
        expect(decisionDetailsFactory.decision).toEqual(response.resultObject);
        expect(rootScope.dealStatus).toBe(response.resultObject.dealStatusCode);
        expect(scope.decision).toEqual(response.resultObject);
        expect(location.path).toHaveBeenCalledWith("/dealfulfillment");
    });

    it('call dealRedirectOuter with sourceGroupNoDeleted = false and deal status finalise', function() {
        var deal = { id: 1, sourceGroupNo: 12345, dealStatus: Constants.dealStatus.FINALISE, sourceGroupNoDeleted: false },
            response = {},
            config = {};
        spyOn(location, 'path');
        httpBackend.expectPOST(/getDealDecisionDetails/).respond(200, response);
        dealService.dealRedirectOuter(deal.id, deal.sourceGroupNo, deal.dealStatus, deal.sourceGroupNoDeleted, scope, Constants.dealStatusCode.FINALIZE_DEAL);
        httpBackend.flush();
        expect(location.path).toHaveBeenCalledWith("/dealfulfillment");
    });

    it('call dealRedirectOuter with sourceGroupNoDeleted = false and deal status submitted to TLA and not launchpadhome', function() {
        var deal = { id: 1, sourceGroupNo: 12345, dealStatus: Constants.dealStatus.SUBMIT, sourceGroupNoDeleted: false };
        spyOn(location, 'path');
        dealService.dealRedirectOuter(deal.id, deal.sourceGroupNo, deal.dealStatus, deal.sourceGroupNoDeleted, scope, Constants.dealStatusCode.SUBMIT);
        expect(rootScope.dealId).toBe(deal.id);
        expect(custGroupDetailFactory.custGroupId).toBe(deal.sourceGroupNo);
        expect(location.path).toHaveBeenCalledWith("/dealPage");
    });

    it('call dealRedirectOuter with sourceGroupNoDeleted = false and deal status submitted to TLA and launchpadhome', function() {
        var deal = { id: 1, sourceGroupNo: 12345, dealStatus: Constants.dealStatus.SUBMIT, sourceGroupNoDeleted: false };
        spyOn(location, 'path');
        dealService.dealRedirectOuter(deal.id, deal.sourceGroupNo, deal.dealStatus, deal.sourceGroupNoDeleted, scope, Constants.dealStatusCode.SUBMIT, { isLaunchPadHome: true });
        expect(rootScope.dealStatus).toBe(deal.dealStatus);
        expect(location.path).toHaveBeenCalledWith("/dealfulfillment");
    });

    it('call dealRedirectOuter with sourceGroupNoDeleted and deal status Unsuccessful or submitetd to TLA', function() {
        var deal = { id: 1, sourceGroupNo: 12345, dealStatus: Constants.dealStatus.UNSUCCESS, sourceGroupNoDeleted: true };
        spyOn(location, 'path');
        dealService.dealRedirectOuter(deal.id, deal.sourceGroupNo, deal.dealStatus, deal.sourceGroupNoDeleted, scope, null);
        expect(rootScope.dealId).toBe(deal.id);
        expect(custGroupDetailFactory.custGroupId).toBe(deal.sourceGroupNo);
        expect(location.path).toHaveBeenCalledWith("/dealPage");
    });

    it('call dealRedirectOuter with sourceGroupNoDeleted and deal status other than Unsuccessful or submitetd to TLA', function() {
        var deal = { id: 1, sourceGroupNo: 12345, dealStatus: Constants.dealStatus.READY, sourceGroupNoDeleted: true };
        spyOn(location, 'path');
        dealService.dealRedirectOuter(deal.id, deal.sourceGroupNo, deal.dealStatus, deal.sourceGroupNoDeleted, scope, null);
        expect(scope.sourceGroupDeletionHeading).toBe("Status of your Deal");
        expect(scope.sourceGroupDeletionWarning).toBe("This deal can no longer be progressed as the connection has been deleted from WOS");
        expect(location.path).not.toHaveBeenCalled();
    });

    it('call isDealsubmittedToTLA with different status', function() {
        var result = dealService.isDealsubmittedToTLA(Constants.dealStatus.SUBMIT);
        expect(result).toBeTruthy();
        result = dealService.isDealsubmittedToTLA(Constants.dealStatus.UNSUCCESS);
        expect(result).toBeTruthy();
        result = dealService.isDealsubmittedToTLA(Constants.dealStatus.READY);
        expect(result).not.toBeTruthy();
    });

    it('call redirectDealBasedOnStatus if deal not submitted to TLA or not unsuccessful', function() {
        var deal = { id: 1, sourceGroupNo: 12345, dealStatus: Constants.dealStatus.FINALISE, sourceGroupNoDeleted: true },
            user = {},
            config = { isDealsubmittedToTLA: false },
            scope = {};
        spyOn(dealService, 'isDealsubmittedToTLA').and.returnValue(false);
        spyOn(dealService, 'redirectDeal');
        dealService.redirectDealBasedOnStatus(deal, user, scope, config);
        expect(dealService.isDealsubmittedToTLA).not.toHaveBeenCalledWith(deal.dealStatus);
        expect(dealService.redirectDeal).toHaveBeenCalledWith(deal, scope, config);
    });

    it('call redirectDealBasedOnStatus if deal submitted to TLA and responded with retry', function() {
        var deal = { dealId: 1, sourceGroupNo: 12345, dealStatus: Constants.dealStatus.SUBMIT, sourceGroupNoDeleted: true },
            user = {},
            config = {},
            scope = {};
        var showSubmittedDealStatusModalCall = deferred.defer();
        spyOn(modalService, 'showSubmittedDealStatusModal').and.returnValue({ result: showSubmittedDealStatusModalCall.promise });
        dealService.redirectDealBasedOnStatus(deal, user, scope, config);
        spyOn(dealService, 'dealRedirectOuter');
        showSubmittedDealStatusModalCall.resolve("retry");
        rootScope.$apply();
        expect(modalService.showSubmittedDealStatusModal).toHaveBeenCalledWith(deal, user);
        expect(dealService.dealRedirectOuter).toHaveBeenCalledWith(deal.dealId, deal.sourceGroupNo, Constants.dealStatus.UNSUCCESS, false, jasmine.any(Object), null, jasmine.any(Object), undefined);
    });

    it('call redirectDealBasedOnStatus if deal submitted to TLA and not responded with retry', function() {
        var deal = { dealId: 1, sourceGroupNo: 12345, dealStatusId: 13, sourceGroupNoDeleted: true },
            user = {},
            config = {},
            scope = {};
        var showSubmittedDealStatusModalCall = deferred.defer();
        spyOn(modalService, 'showSubmittedDealStatusModal').and.returnValue({ result: showSubmittedDealStatusModalCall.promise });
        dealService.redirectDealBasedOnStatus(deal, user, scope, config);
        spyOn(dealService, 'dealRedirectOuter');
        showSubmittedDealStatusModalCall.resolve("");
        rootScope.$apply();
        expect(modalService.showSubmittedDealStatusModal).toHaveBeenCalledWith(deal, user);
        expect(dealService.dealRedirectOuter).not.toHaveBeenCalled();
    });

    it('call redirectDealBasedOnStatus if deal status is unsuccessful and responded with retry', function() {
        var deal = { dealId: 1, sourceGroupNo: 12345, dealStatusId: 15, sourceGroupNoDeleted: true },
            user = {},
            config = {},
            scope = {};
        var showUnsuccessDealStatusModalCall = deferred.defer();
        spyOn(modalService, 'showUnsuccessDealStatusModal').and.returnValue({ result: showUnsuccessDealStatusModalCall.promise });
        dealService.redirectDealBasedOnStatus(deal, user, scope, config);
        spyOn(dealService, 'dealRedirectOuter');
        showUnsuccessDealStatusModalCall.resolve("retry");
        rootScope.$apply();
        expect(modalService.showUnsuccessDealStatusModal).toHaveBeenCalledWith(deal, user);
        expect(dealService.dealRedirectOuter).toHaveBeenCalledWith(deal.dealId, deal.sourceGroupNo, Constants.dealStatus.UNSUCCESS, false, jasmine.any(Object), null, jasmine.any(Object), undefined);
    });

    it('call redirectDealBasedOnStatus if deal status is unsuccessful and not responded with retry', function() {
        var deal = { dealId: 1, sourceGroupNo: 12345, dealStatusId: 15, sourceGroupNoDeleted: true },
            user = {},
            config = {},
            scope = {};
        var showUnsuccessDealStatusModalCall = deferred.defer();
        spyOn(modalService, 'showUnsuccessDealStatusModal').and.returnValue({ result: showUnsuccessDealStatusModalCall.promise });
        dealService.redirectDealBasedOnStatus(deal, user, scope, config);
        spyOn(dealService, 'dealRedirectOuter');
        showUnsuccessDealStatusModalCall.resolve("");
        rootScope.$apply();
        expect(modalService.showUnsuccessDealStatusModal).toHaveBeenCalledWith(deal, user);
        expect(dealService.dealRedirectOuter).not.toHaveBeenCalled();
    });
});
